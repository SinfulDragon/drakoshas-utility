import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Push back embedded spell property one object-nesting level */
export declare class Migration772V10EmbeddedSpellData extends MigrationBase {
    static version: number;
    preUpdateItem(source: ItemSourcePF2e): Promise<void>;
}
