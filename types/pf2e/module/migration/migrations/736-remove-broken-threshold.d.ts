import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Remove brokenThreshold property left undeleted in `Migration728FlattenPhysicalProperties` */
export declare class Migration736RemoveBrokenThreshold extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
