import { geoEqualEarth, geoPath, type GeoProjection } from 'd3-geo';
import type { Geometry } from 'geojson';

/**
 * Map view state: an Equal Earth base projection fitted to the canvas plus a
 * zoom/pan transform (screen = base(point) · k + t), with helpers to derive
 * a composed projection for rendering and to invert pointer positions.
 *
 * Equal Earth was chosen deliberately: it is equal-area (fair to all regions
 * across 300 millennia of shifting focus), has gentle distortion, and is not
 * tied to the web-Mercator tile ecosystem. See docs/ARCHITECTURE.md.
 */
export class MapViewState {
  width = 800;
  height = 600;
  k = 1;
  tx = 0;
  ty = 0;
  /** Incremented whenever the composed projection changes; used as cache key. */
  version = 0;

  readonly minZoom = 0.8;
  readonly maxZoom = 40;

  private base: GeoProjection = geoEqualEarth();
  private composed: GeoProjection = geoEqualEarth();

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.base = geoEqualEarth().fitExtent(
      [
        [12, 12],
        [width - 12, height - 12],
      ],
      { type: 'Sphere' },
    );
    this.bump();
  }

  private bump() {
    this.version++;
    const bs = this.base.scale();
    const [btx, bty] = this.base.translate();
    this.composed = geoEqualEarth()
      .scale(bs * this.k)
      .translate([btx * this.k + this.tx, bty * this.k + this.ty]);
  }

  get projection(): GeoProjection {
    return this.composed;
  }

  /** Zoom about a screen point by factor. */
  zoomBy(factor: number, cx?: number, cy?: number) {
    const x = cx ?? this.width / 2;
    const y = cy ?? this.height / 2;
    const k2 = Math.min(this.maxZoom, Math.max(this.minZoom, this.k * factor));
    const f = k2 / this.k;
    this.tx = x - (x - this.tx) * f;
    this.ty = y - (y - this.ty) * f;
    this.k = k2;
    this.clampPan();
    this.bump();
  }

  panBy(dx: number, dy: number) {
    this.tx += dx;
    this.ty += dy;
    this.clampPan();
    this.bump();
  }

  private clampPan() {
    // Keep the projected sphere from escaping the viewport entirely.
    const margin = 80;
    const w = this.width * this.k;
    const h = this.height * this.k;
    this.tx = Math.min(this.width, Math.max(this.width - w - margin, this.tx));
    this.ty = Math.min(this.height, Math.max(this.height - h - margin, this.ty));
  }

  reset() {
    this.k = 1;
    this.tx = 0;
    this.ty = 0;
    this.bump();
  }

  /** Animate the view to fit a geometry (or reset when undefined). */
  fitGeometry(geometry: Geometry | undefined, paddingFraction = 0.25): { k: number; tx: number; ty: number } {
    if (!geometry) return { k: 1, tx: 0, ty: 0 };
    const path = geoPath(this.base);
    const [[x0, y0], [x1, y1]] = path.bounds(geometry as never);
    const w = Math.max(1e-6, x1 - x0);
    const h = Math.max(1e-6, y1 - y0);
    const k = Math.min(
      this.maxZoom,
      Math.max(this.minZoom, (1 - paddingFraction) / Math.max(w / this.width, h / this.height)),
    );
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    return { k, tx: this.width / 2 - cx * k, ty: this.height / 2 - cy * k };
  }

  /** Transform that centres a lon/lat at a given zoom, without any geometry. */
  transformForPoint(lon: number, lat: number, k: number): { k: number; tx: number; ty: number } {
    const p = this.base([lon, lat]);
    const k2 = Math.min(this.maxZoom, Math.max(this.minZoom, k));
    if (!p) return { k: k2, tx: this.tx, ty: this.ty };
    return { k: k2, tx: this.width / 2 - k2 * p[0], ty: this.height / 2 - k2 * p[1] };
  }

  setTransform(k: number, tx: number, ty: number) {
    this.k = Math.min(this.maxZoom, Math.max(this.minZoom, k));
    this.tx = tx;
    this.ty = ty;
    this.bump();
  }

  /** Invert a screen position to [lon, lat], or null when off the sphere. */
  invert(x: number, y: number): [number, number] | null {
    const p = this.composed.invert?.([x, y]);
    if (!p || !isFinite(p[0]) || !isFinite(p[1])) return null;
    // Reject points outside the projected sphere (invert can extrapolate).
    const rt = this.composed(p);
    if (!rt) return null;
    const dx = rt[0] - x;
    const dy = rt[1] - y;
    return dx * dx + dy * dy < 1 ? p : null;
  }
}
