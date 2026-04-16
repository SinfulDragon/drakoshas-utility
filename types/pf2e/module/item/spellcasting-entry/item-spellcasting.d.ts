import type { CreaturePF2e } from "@actor";
import { AttributeString } from "@actor/types.js";
import type { PhysicalItemPF2e, SpellPF2e } from "@item";
import { MagicTradition } from "@item/spell/types.js";
import type { Predicate } from "@system/predication.js";
import type { Statistic } from "@system/statistic/statistic.js";
import { SpellCollection } from "./collection.js";
import type { CastOptions, SpellcastingEntry, SpellcastingSheetData } from "./types.js";
/** An in-memory spellcasting entry for items-only spellcasting */
declare class ItemSpellcasting<TActor extends CreaturePF2e = CreaturePF2e> implements SpellcastingEntry<TActor> {
    id: string;
    name: string;
    actor: TActor;
    statistic: Statistic;
    tradition: MagicTradition | null;
    original: SpellcastingEntry<TActor> | null;
    /** A predicate to test against a physical item to determine whether its contained spell can be cast */
    castPredicate: Predicate;
    constructor({ id, name, actor, statistic, tradition, original, castPredicate, }: ItemsSpellcastingConstructorParams<TActor>);
    get counteraction(): Statistic;
    get attribute(): AttributeString;
    get category(): "items";
    get sort(): number;
    get spells(): null;
    get isFlexible(): false;
    get isFocusPool(): false;
    get isEphemeral(): true;
    canCast(spell: SpellPF2e, { origin }?: {
        origin?: Maybe<PhysicalItemPF2e>;
    }): boolean;
    cast(spell: SpellPF2e, options?: CastOptions): Promise<void>;
    getSheetData({ spells }?: {
        spells?: SpellCollection<TActor>;
    }): Promise<SpellcastingSheetData>;
}
interface ItemsSpellcastingConstructorParams<TActor extends CreaturePF2e> {
    id: string;
    name: string;
    actor: TActor;
    statistic: Statistic;
    tradition?: Maybe<MagicTradition>;
    castPredicate: Predicate;
    original?: SpellcastingEntry<TActor>;
}
export { ItemSpellcasting };
