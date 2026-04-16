import type { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Refresh rule elements on mighty bulwark feat. */
export declare class Migration869RefreshMightyBulwark extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
