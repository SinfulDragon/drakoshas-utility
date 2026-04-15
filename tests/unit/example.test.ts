import { describe, expect, it } from "vitest";
import { moduleId } from "@/module/helpers.ts";

describe("moduleId", () => {
  it("returns module id", () => {
    expect(moduleId()).toBe("drakoshas-utility");
  });
});
