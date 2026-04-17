import { applyHarrowingEffect, applyHarrowingImmunity } from "../automations/harrowing/gm-handlers.ts";
import { registerSettings } from "../settings/register-settings.ts";
import { registerSocketlibHook } from "../socket/index.ts";
import { registerPreCreateItemHook } from "./pre-create-item.ts";

export function registerInitHook(): void {
  Hooks.once("init", () => {
    registerSettings();
    registerPreCreateItemHook();
  });

  registerSocketlibHook({
    applyEffect: applyHarrowingEffect,
    applyImmunity: applyHarrowingImmunity,
  });
}
