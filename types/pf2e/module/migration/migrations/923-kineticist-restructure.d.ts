import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
/** Move existing kineticists to the new class automation structure **/
export declare class Migration923KineticistRestructure extends MigrationBase {
    #private;
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
}
