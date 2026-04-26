const LEVEL_BASED_DC: Record<number, number> = {
  [-1]: 13,
  0: 14,
  1: 15,
  2: 16,
  3: 18,
  4: 19,
  5: 20,
  6: 22,
  7: 23,
  8: 24,
  9: 26,
  10: 27,
  11: 28,
  12: 30,
  13: 31,
  14: 32,
  15: 34,
  16: 35,
  17: 36,
  18: 38,
  19: 39,
  20: 40,
  21: 42,
  22: 44,
  23: 46,
  24: 48,
  25: 50,
} as const;

export function getLevelBasedDC(level: number): number {
  const clamped = Math.max(-1, Math.min(25, level));
  const dc = LEVEL_BASED_DC[clamped];
  if (dc === undefined) {
    throw new Error(`No DC defined for level ${clamped}`);
  }
  return dc;
}

export function getRitualDC(rank: number): number {
  const ritualLevel = rank * 2;
  return getLevelBasedDC(ritualLevel) + 5;
}
