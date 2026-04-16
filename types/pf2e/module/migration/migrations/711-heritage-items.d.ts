import type { ActorSourcePF2e } from "@actor/data/index.js";
import type { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
export declare class Migration711HeritageItems extends MigrationBase {
    #private;
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
}
