import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Correct the structure of spell damage in case it slipped past a previous migration */
export declare class Migration703SpellDamageStructure extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
