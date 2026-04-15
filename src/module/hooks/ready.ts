import { isPf2eActive } from "../pf2e";

export function registerReadyHook(): void {
  Hooks.once("ready", () => {
    if (!isPf2eActive()) return;
  });
}
