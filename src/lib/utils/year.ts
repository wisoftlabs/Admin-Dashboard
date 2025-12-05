export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function generateComingYears(baseYear: number = 2025, offset: number = 2): number[] {
  return Array.from({ length: offset }).map((_, i) => baseYear + i);
}
