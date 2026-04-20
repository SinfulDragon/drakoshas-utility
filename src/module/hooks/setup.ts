import { exposeApi } from "../api.ts";
import { Logger } from "@/module/logger.ts";

export function registerSetupHook(): void {
  Logger.debug("registerSetupHook: attaching setup handler");

  Hooks.once("setup", () => {
    exposeApi();
    Logger.info("setup end");
  });
}
