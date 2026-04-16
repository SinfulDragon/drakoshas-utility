import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Change `usage` of religious symbols to "held-in-one-hand" */
export declare class Migration773ReligiousSymbolUsage extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
