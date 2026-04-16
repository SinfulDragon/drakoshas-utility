import type { CreatureTrait } from "@actor/creature/types.js";
import type { AbilityTrait } from "@item/ability/types.js";
import type { KingmakerTrait } from "@item/campaign-feature/types.js";
import type { NPCAttackTrait } from "@item/melee/types.js";
import type { PhysicalItemTrait } from "@item/physical/types.js";
type ItemTrait = AbilityTrait | CreatureTrait | PhysicalItemTrait | NPCAttackTrait | KingmakerTrait;
export type { ItemTrait };
