import {
  applyHarrowingEffect,
  applyHarrowingImmunity
} from "../automations/harrowing/gm-handlers.ts";
import { Logger } from "@/module/logger.ts";
import { registerSettings } from "../settings/register-settings.ts";
import { registerSocketlibHook } from "../socket/index.ts";
import { registerPreCreateItemHook } from "./pre-create-item.ts";

export function registerInitHook(): void {
  Logger.debug("registerInitHook: attaching init/socketlib handlers");

  Hooks.once("init", () => {
    Logger.debug("init hook: start");
    registerSettings();
    registerPreCreateItemHook();
    Logger.debug("init hook: end");
  });

  registerSocketlibHook({
    applyEffect: applyHarrowingEffect,
    applyImmunity: applyHarrowingImmunity
  });
}
