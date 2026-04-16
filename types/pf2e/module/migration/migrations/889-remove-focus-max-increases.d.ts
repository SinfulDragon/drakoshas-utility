import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Remove AE-likes that increase the size of a PC's focus pool. */
export declare class Migration889RemoveFocusMaxIncreases extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
