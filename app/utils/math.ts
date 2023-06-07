export function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}

export function interpolate(amt: number, lower: number, upper: number): number {
  return lower + (amt * (upper - lower));
}

export function inverseInterpolate(value: number, lower: number, upper: number): number {
  return (value - lower) / (upper - lower);
}
