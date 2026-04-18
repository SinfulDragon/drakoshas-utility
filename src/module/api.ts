import { moduleId } from "./helpers.ts";
import { runHarrowing } from "./automations/harrowing/orchestrate.ts";
import { Logger } from "@/module/logger.ts";

export interface DrakoshaModuleApi {
  runHarrowing: typeof runHarrowing;
}

declare module "@client/packages/module.mjs" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export default interface Module {
    api?: DrakoshaModuleApi;
  }
}

export function exposeApi(): DrakoshaModuleApi {
  const api: DrakoshaModuleApi = { runHarrowing };
  const mod = game.modules.get(moduleId());

  if (!mod) {
    Logger.error(`Module ${moduleId()} not found in game.modules`);
    return api;
  }

  mod.api = api;
  Logger.info("API exposed on module.api");
  Logger.debug(`API exposed fields: [${Object.keys(api).join(", ")}]`);
  return api;
}
