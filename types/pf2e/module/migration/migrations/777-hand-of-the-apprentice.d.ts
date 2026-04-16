import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Have Hand of the Apprentice feat enlarge focus pool */
export declare class Migration777HandOfTheApprentice extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
