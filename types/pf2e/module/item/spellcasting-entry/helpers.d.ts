import type { ActorPF2e } from "@actor";
import type { ZeroToTen } from "@module/data.js";
import { Statistic } from "@system/statistic/statistic.js";
import type { SpellSlotGroupId } from "./collection.js";
import type { SpellcastingEntry } from "./types.js";
/** Create a statistic that draws from limited domains for the purpose of counteracting. */
declare function createCounteractStatistic<TActor extends ActorPF2e>(ability: SpellcastingEntry<TActor>): Statistic<TActor>;
declare function spellSlotGroupIdToNumber(groupId: SpellSlotGroupId): ZeroToTen;
declare function spellSlotGroupIdToNumber(groupId: Maybe<string | number>): ZeroToTen | null;
/** Try to coerce some value (typically from user input) to a slot group ID */
declare function coerceToSpellGroupId(value: unknown): SpellSlotGroupId | null;
/** Returns the label for a rank header, such as "1st Rank" */
declare function getSpellRankLabel(group: "cantrips" | number): string;
export { coerceToSpellGroupId, createCounteractStatistic, getSpellRankLabel, spellSlotGroupIdToNumber };
