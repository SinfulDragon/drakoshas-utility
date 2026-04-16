import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Clean up entries of consumable system data */
export declare class Migration815ConsumableDataCleanup extends MigrationBase {
    static version: number;
    consumableKeys: Set<string>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
