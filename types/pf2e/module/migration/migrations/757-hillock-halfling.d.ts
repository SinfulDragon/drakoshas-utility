import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Add recovery bonus to Hillock Halfling heritage */
export declare class Migration757HillockHalfling extends MigrationBase {
    static version: number;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
