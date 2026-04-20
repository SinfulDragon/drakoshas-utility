import { moduleId } from "@/module/helpers.ts";
import { Logger } from "@/module/logger.ts";

const DEBUG_LOGGING_KEY = "debugLogging";

export function registerSettings(): void {
  Logger.debug("Registering settings");

  game.settings.register(moduleId(), DEBUG_LOGGING_KEY, {
    name: "DRAKOSHAS_UTILITY.Settings.DebugLogging.Name",
    hint: "DRAKOSHAS_UTILITY.Settings.DebugLogging.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: (value: unknown) => {
      const enabled = Boolean(value);
      Logger.setDebugEnabled(enabled);
      Logger.info(`Debug logging ${enabled ? "enabled" : "disabled"}`);
    }
  });

  const initialValue = game.settings.get(
    moduleId(),
    DEBUG_LOGGING_KEY
  ) as boolean;
  Logger.setDebugEnabled(initialValue);
}
