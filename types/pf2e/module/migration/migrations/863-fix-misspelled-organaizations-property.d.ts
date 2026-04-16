import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
/** Correct a misspelling in the character biography data. */
export declare class Migration863FixMisspelledOrganaizationsProperty extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
