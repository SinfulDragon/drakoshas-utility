import { registerSettings } from "../settings/register-settings.ts";

export function registerInitHook(): void {
  Hooks.once("init", () => {
    registerSettings();
  });
}
