import { exposeApi } from "../api.ts";
import { Logger } from "@/module/logger.ts";

export function registerSetupHook(): void {
  Logger.debug("registerSetupHook: attaching setup handler");

  Hooks.once("setup", () => {
    Logger.debug("setup hook: start");
    Logger.info("Setup hook triggered");
    exposeApi();
    Logger.debug("setup hook: end");
  });
}
