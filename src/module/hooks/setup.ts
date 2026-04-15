export function registerSetupHook(): void {
  Hooks.once("setup", () => {
    console.log("Setup hook triggered");
  });
}
