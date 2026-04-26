import { describe, expect, it } from "vitest";
import { getLevelBasedDC, getRitualDC } from "@/module/pf2e/dc.ts";

describe("getLevelBasedDC", () => {
  const expectedDCs: [number, number][] = [
    [-1, 13],
    [0, 14],
    [1, 15],
    [2, 16],
    [3, 18],
    [4, 19],
    [5, 20],
    [6, 22],
    [7, 23],
    [8, 24],
    [9, 26],
    [10, 27],
    [11, 28],
    [12, 30],
    [13, 31],
    [14, 32],
    [15, 34],
    [16, 35],
    [17, 36],
    [18, 38],
    [19, 39],
    [20, 40],
    [21, 42],
    [22, 44],
    [23, 46],
    [24, 48],
    [25, 50],
  ];

  it.each(expectedDCs)("returns DC %i for level %i", (level, expected) => {
    expect(getLevelBasedDC(level)).toBe(expected);
  });

  it("clamps negative levels to -1", () => {
    expect(getLevelBasedDC(-5)).toBe(13);
    expect(getLevelBasedDC(-100)).toBe(13);
  });

  it("clamps levels above 25 to 25", () => {
    expect(getLevelBasedDC(26)).toBe(50);
    expect(getLevelBasedDC(100)).toBe(50);
  });
});

describe("getRitualDC", () => {
  it("returns DC 21 for rank 1 (level 2 DC 16 + 5)", () => {
    expect(getRitualDC(1)).toBe(21);
  });

  it("returns DC 24 for rank 2 (level 4 DC 19 + 5)", () => {
    expect(getRitualDC(2)).toBe(24);
  });

  it("returns DC 27 for rank 3 (level 6 DC 22 + 5)", () => {
    expect(getRitualDC(3)).toBe(27);
  });

  it("returns DC 45 for rank 10 (level 20 DC 40 + 5)", () => {
    expect(getRitualDC(10)).toBe(45);
  });

  it("caps at rank 13 (level 26 clamped to 25, DC 50 + 5 = 55)", () => {
    expect(getRitualDC(13)).toBe(55);
  });

  it("returns same result for rank > 13 due to clamping", () => {
    expect(getRitualDC(20)).toBe(55);
  });
});
