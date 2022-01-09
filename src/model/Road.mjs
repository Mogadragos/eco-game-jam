export class Road {
  curves;
  functions;
  constructor(curves) {
    this.curves = curves;
    this.lastCurveIndex = curves.length - 1;
    this.calcFunctions();
  }
  calcFunctions() {
    this.functions = [];
    for (const curve of this.curves) {
      this.functions.push(this.genCubicBezierXY(curve));
    }
  }
  genCubicBezierXY(curve) {
    const x = this.genCubicN(curve.x1, curve.x2, curve.x3, curve.x4);
    const y = this.genCubicN(curve.y1, curve.y2, curve.y3, curve.y4);
    return (T) => {
      return { x: x(T), y: y(T) };
    };
  }
  genCubicN(a, b, c, d) {
    return (T) => {
      const t2 = T * T;
      const t3 = t2 * T;
      return (
        a +
        (-a * 3 + T * (3 * a - a * T)) * T +
        (3 * b + T * (-6 * b + b * 3 * T)) * T +
        (c * 3 - c * 3 * T) * t2 +
        d * t3
      );
    };
  }
  getPosition(T) {
    const index = Math.trunc(T);
    if (index < 0 || index > this.lastCurveIndex) return { out: true };
    return this.functions[index](T - index);
  }
}
