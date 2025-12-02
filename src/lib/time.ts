export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function generateComingYears(offset: number = 2): number[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: offset }).map((_, i) => currentYear + i);
}
