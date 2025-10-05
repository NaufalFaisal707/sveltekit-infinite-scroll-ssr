export function parseLimit(param: string | null, min = 0, max = 50) {
  const num = Number(param);
  return Math.min(Math.max(Number.isFinite(num) ? num : 0, min), max);
}

export function parseSkip(param: string | null) {
  const num = Number(param);
  return Math.max(0, Number.isFinite(num) ? num : 0);
}
