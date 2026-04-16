import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Fix featType properties erroneously set to a non-existent "dedication" type */
export declare class Migration732FixDedicationFeatTypes extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
