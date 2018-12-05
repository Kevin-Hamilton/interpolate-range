// @flow

export default function clamp(
  from: number,
  to: number,
  x: number,
): number {
  let val = x;
  let min = Math.min(from, to);
  let max = Math.max(from, to);
  if (val < min) val = min;
  if (val > max) val = max;

  return val;
}
