import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
/** Move tracking of roll-option toggles to the rules themselves */
export declare class Migration741RollOptionToggleToItem extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
