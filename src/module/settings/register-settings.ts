import { moduleId } from "../helpers";

export function registerSettings(): void {
  game.settings.register(moduleId(), "example-setting", {
    name: "Drakosha's Utility: Example Setting",
    hint: "Example world setting scaffold.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
}
