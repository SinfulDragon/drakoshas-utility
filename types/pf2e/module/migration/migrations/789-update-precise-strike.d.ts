import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Fix the predicate on the Precise Strike's DamageDice rule element  */
export declare class Migration789UpdatePreciseStrike extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
