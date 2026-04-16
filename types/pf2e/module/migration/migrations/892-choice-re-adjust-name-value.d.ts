import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Convert string values in adjustName property to a boolean */
export declare class Migration892ChoiceSetREAdjustNameValue extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
