import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Ensure "backpack" weapons and alchemical bombs have correct reload times */
export declare class Migration753WeaponReloadTimes extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
