import { Logger } from "@/module/logger.ts";
import { registerSettings } from "../settings/register-settings.ts";
import { registerTemplates } from "../templates/register-templates.ts";

export function registerInitHook(): void {
  Hooks.once("init", async () => {
    registerSettings();
    await registerTemplates();
    Logger.info("initialized");
  });
}
