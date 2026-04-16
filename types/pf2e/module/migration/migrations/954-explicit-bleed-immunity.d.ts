import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
/** Add explicit bleed immunity to non-vampire undead. */
export declare class Migration954ExplicitBleedImmunity extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
