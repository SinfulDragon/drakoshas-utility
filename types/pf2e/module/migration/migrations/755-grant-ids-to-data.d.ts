import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
/** Convert grant flags containing IDs to `ItemGrantData` objects */
export declare class Migration755GrantIdsToData extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
