import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Update the descriptions of several spells with new effect items */
export declare class Migration720UpdateSpellDescriptions extends MigrationBase {
    static version: number;
    private spellUUIDs;
    private spells;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
