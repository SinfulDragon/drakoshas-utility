import { Logger } from "@/module/logger.ts";

export function registerReadyHook(): void {
  Logger.debug("registerReadyHook: attaching ready handler");

  Hooks.once("ready", () => {
    Logger.debug("ready hook: start");
    Logger.info("Ready hook triggered");
    Logger.debug(
      `ready hook: debugLogging=${Logger.isDebugEnabled()}, user=${game.user?.name ?? "∅"} (isGM=${Boolean(game.user?.isGM)})`,
    );
  });
}
