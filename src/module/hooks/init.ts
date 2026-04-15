import { registerSettings } from "../settings/register-settings";

export function registerInitHook(): void {
  Hooks.once("init", () => {
    registerSettings();
  });
}
