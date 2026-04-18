import type { EffectSource } from "@item/effect/data.ts";

import { moduleId } from "../helpers.ts";
import { Logger } from "@/module/logger.ts";

export type HarrowingHandler = (
  targetUuid: string,
  source: PreCreate<EffectSource>,
) => Promise<void>;

export interface HarrowingHandlers {
  applyEffect: HarrowingHandler;
  applyImmunity: HarrowingHandler;
}

let socket: SocketlibSocket | null = null;

export function registerSocketlibHook(handlers: HarrowingHandlers): void {
  Logger.debug("registerSocketlibHook: attaching socketlib.ready handler");

  Hooks.once("socketlib.ready", () => {
    Logger.debug("socketlib.ready hook: start");
    socket = socketlib.registerModule(moduleId());
    socket.register("applyEffect", handlers.applyEffect as (...args: never[]) => unknown);
    socket.register("applyImmunity", handlers.applyImmunity as (...args: never[]) => unknown);
    Logger.debug("socketlib handlers registered: [applyEffect, applyImmunity]");
    Logger.info("socketlib module registered");
  });
}

export function getSocket(): SocketlibSocket {
  if (!socket) {
    throw new Error(`${moduleId()}: socketlib ещё не инициализирован`);
  }
  return socket;
}
