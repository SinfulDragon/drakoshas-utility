import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
/** Ensure actor speed values are numbers */
export declare class Migration780NumifySpeeds extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
