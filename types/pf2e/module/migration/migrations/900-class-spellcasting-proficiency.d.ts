import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Record initial spellcasting proficiency in class item data */
export declare class Migration900ClassSpellcastingProficiency extends MigrationBase {
    static version: number;
    /** Remove persisted spellcasting proficiency */
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
