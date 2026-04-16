import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/**
 * Followup migration to make all basic ammo consumable and convert predicates
 * that check for the ammo category to instead check for the ammo item type.
 */
export declare class Migration952AmmoTraitsAndOptions extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
