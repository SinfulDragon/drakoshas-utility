import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Move existing swashbucklers finishers to the new mergeable suboptions **/
export declare class Migration922SwashbucklerFinishers extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
