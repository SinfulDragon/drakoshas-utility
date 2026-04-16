import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
/**
 * Converts 0 value saves to null on hazards.
 * Until this migration, a 0 save meant it didn't exist, but now that's what null means.
 * This migration is not safe to run multiple times, as 0 is a valid value.
 */
export declare class Migration955HazardNullSaves extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
