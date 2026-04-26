import { describe, expect, it } from "vitest";
import { getMaxRitualRank } from "@/module/pf2e/ritual.ts";

describe("getMaxRitualRank", () => {
  const makeActor = (level: number) => ({ level });

  it.each([
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 2],
    [5, 3],
    [6, 3],
    [7, 4],
    [8, 4],
    [9, 5],
    [10, 5],
    [11, 6],
    [12, 6],
    [13, 7],
    [14, 7],
    [15, 8],
    [16, 8],
    [17, 9],
    [18, 9],
    [19, 10],
    [20, 10],
  ])("returns rank %i for level %i", (level, expected) => {
    expect(getMaxRitualRank(makeActor(level))).toBe(expected);
  });

  it("returns at least rank 1 for level 0", () => {
    expect(getMaxRitualRank(makeActor(0))).toBe(1);
  });

  it("handles missing level by defaulting to 1", () => {
    expect(getMaxRitualRank({ level: undefined } as unknown as { level: number })).toBe(1);
  });
});
