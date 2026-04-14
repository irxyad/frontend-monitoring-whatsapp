export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) return `${Math.floor(value / 1_000_000_000)}M+`;
  if (value >= 1_000_000) return `${Math.floor(value / 1_000_000)}Jt+`;
  if (value >= 1_000) return `${Math.floor(value / 1_000)}Rb+`;
  return String(value);
}
