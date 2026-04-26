import { registerSocketlibHook } from "../socket/index.ts";
import { applyEffect } from "../gm-methods.ts";

export function registerSocketHook(): void {
  registerSocketlibHook(applyEffect);
}
