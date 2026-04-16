import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Replace all alignment damage and IWR with spirit damage and/or the holy trait */
export declare class Migration885ConvertAlignmentDamage extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
}
