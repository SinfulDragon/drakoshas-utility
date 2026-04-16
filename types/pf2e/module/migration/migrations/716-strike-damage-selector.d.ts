import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
export declare class Migration716StrikeDamageSelector extends MigrationBase {
    static version: number;
    private itemsToSkip;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
