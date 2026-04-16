import { applyHarrowingEffect, applyHarrowingImmunity } from "../harrowing/gm-handlers.ts";
import { registerSettings } from "../settings/register-settings.ts";
import { registerSocketlibHook } from "../socket/index.ts";

export function registerInitHook(): void {
  Hooks.once("init", () => {
    registerSettings();
  });

  registerSocketlibHook({
    applyEffect: applyHarrowingEffect,
    applyImmunity: applyHarrowingImmunity,
  });
}
