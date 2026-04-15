export function registerReadyHook(): void {
  Hooks.once("ready", () => {
    console.log("Ready hook triggered");
  });
}
