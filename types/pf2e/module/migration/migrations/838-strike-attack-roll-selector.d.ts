import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Replace all instances of "mundane-attack" selector with "strike-attack-roll" */
export declare class Migration838StrikeAttackRollSelector extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
