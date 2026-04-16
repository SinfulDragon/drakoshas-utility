import type { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
export declare class Migration951TreasureCategories extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e & {
        "==system"?: object;
    }): Promise<void>;
}
