import type { ItemUUID } from "@common/documents/_module.d.mts";
import type { SpellPF2e } from "@item";
import type { ItemSourcePF2e, SpellSource } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Handle spells gaining fixed level heightening */
export declare class Migration747FixedHeightening extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    protected overwriteDamage(spell: SpellSource, newSpell: SpellPF2e): void;
    protected loadSpells(): Promise<Record<string, SpellPF2e | undefined>>;
    fixedHeightenSpells: Set<ItemUUID>;
}
