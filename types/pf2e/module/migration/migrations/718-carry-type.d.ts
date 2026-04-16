import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Update physical item usage and equipped to reflect carry types (held, worn, stowed) */
export declare class Migration718CarryType extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e, actor?: ActorSourcePF2e): Promise<void>;
}
