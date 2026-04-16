import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Add/update rule elements for the Calculated Splash and Expanded Splash feats */
export declare class Migration814CalculatedExpandedSplash extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
