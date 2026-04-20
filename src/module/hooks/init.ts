import { Logger } from "@/module/logger.ts";
import { registerSettings } from "../settings/register-settings.ts";

export function registerInitHook(): void {
  Hooks.once("init", () => {
    registerSettings();
    Logger.info("initialized");
  });
}
