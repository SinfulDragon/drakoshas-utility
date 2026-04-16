import { Logger } from "../logger.ts";

export function registerReadyHook(): void {
  Hooks.once("ready", () => {
    Logger.info("Ready hook triggered");
  });
}
