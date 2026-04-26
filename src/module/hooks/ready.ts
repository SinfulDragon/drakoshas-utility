import { Logger } from "@/module/logger.ts";

export function registerReadyHook(): void {
  Hooks.once("ready", () => {
    Logger.info(
      `ready: debugLogging=${Logger.isDebugEnabled()}, user=${game.user?.name ?? "∅"} (isGM=${Boolean(game.user?.isGM)})`
    );
  });
}
