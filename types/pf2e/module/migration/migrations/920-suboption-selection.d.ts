import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Move RollOption RE suboption selections to top level of object. */
export declare class Migration920SuboptionSelection extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e, actorSource: ActorSourcePF2e): Promise<void>;
}
