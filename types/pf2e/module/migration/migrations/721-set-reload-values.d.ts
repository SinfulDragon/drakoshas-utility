import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Set a reload of value of 0 to several weapons that had no reload */
export declare class Migration721SetReloadValues extends MigrationBase {
    static version: number;
    private toUpdate;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
