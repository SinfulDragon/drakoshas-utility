import type { CONSUMABLE_CATEGORIES } from "./values.js";
type ConsumableCategory = SetElement<typeof CONSUMABLE_CATEGORIES>;
type ConsumableTrait = keyof typeof CONFIG.PF2E.consumableTraits;
type OtherConsumableTag = "alchemical-food" | "alchemical-tool" | "herbal";
export type { ConsumableCategory, ConsumableTrait, OtherConsumableTag };
