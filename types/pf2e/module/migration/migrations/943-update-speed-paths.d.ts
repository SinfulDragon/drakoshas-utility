import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
export declare class Migration943UpdateSpeedPath extends MigrationBase {
    static version: number;
    /** Delete legacy speed object from most (likely player-character) actors. */
    updateActor(source: ActorSourcePF2e): Promise<void>;
    /** Update path to land base or derived speed in rule elements. */
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
