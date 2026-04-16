import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Add color darkvision flags to fetchlings and the Resonant Reflection of Life */
export declare class Migration801ColorDarkvision extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
