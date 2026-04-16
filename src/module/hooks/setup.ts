import { exposeApi } from "../api.ts";
import { Logger } from "../logger.ts";

export function registerSetupHook(): void {
  Hooks.once("setup", () => {
    Logger.info("Setup hook triggered");
    exposeApi();
  });
}
