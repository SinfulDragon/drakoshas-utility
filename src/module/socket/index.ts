import type { EffectSource } from "@item/effect/data.ts";

import { moduleId } from "../helpers.ts";
import { Logger } from "@/module/logger.ts";

export type HarrowingHandler = (
  targetUuid: string,
  source: PreCreate<EffectSource>
) => Promise<void>;

let socket: SocketlibSocket | null = null;

export function registerSocketlibHook(handler: HarrowingHandler): void {
  Logger.debug("registerSocketlibHook: attaching socketlib.ready handler");

  Hooks.once("socketlib.ready", () => {
    Logger.debug("socketlib.ready hook: start");
    socket = socketlib.registerModule(moduleId());
    socket.register(
      "applyEffect",
      handler as (...args: never[]) => unknown
    );
    Logger.debug("socketlib handler registered: [applyEffect]");
    Logger.info("socketlib module registered");
  });
}

export function getSocket(): SocketlibSocket {
  if (!socket) {
    throw new Error(
      `${moduleId()}: ${game.i18n.localize("DRAKOSHAS_UTILITY.Socket.NotInitialized")}`
    );
  }
  return socket;
}
