import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
export declare class Migration739RecoveryCheckDC extends MigrationBase {
    static version: number;
    private toughness;
    private defyDeath;
    private mountainsStoutness;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
