import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Rename references to retired compendiums */
export declare class Migration822BladeAllyConsolidation extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
