import type { MAGIC_TRADITIONS } from "./values.js";
type MagicTradition = SetElement<typeof MAGIC_TRADITIONS>;
type SpellTrait = keyof typeof CONFIG.PF2E.spellTraits;
export type { MagicTradition, SpellTrait };
