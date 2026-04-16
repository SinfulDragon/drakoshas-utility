import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Add rule elements to Surprise Attack and Dread Striker, fix damage type of Precision edge */
export declare class Migration833AddRogueToysFixPrecision extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
