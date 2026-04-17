import { exposeApi } from "../api.ts";
import { Logger } from "@/module/logger.ts";

export function registerSetupHook(): void {
  Hooks.once("setup", () => {
    Logger.info("Setup hook triggered");
    exposeApi();
  });
}
