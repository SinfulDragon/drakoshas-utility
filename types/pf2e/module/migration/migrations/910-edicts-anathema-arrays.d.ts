import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
/** Turn edicts and anathema into arrays. */
export declare class Migration910EdictsAnathemaArrays extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
