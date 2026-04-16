import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
export declare class Migration932NPCSystemSkills extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
