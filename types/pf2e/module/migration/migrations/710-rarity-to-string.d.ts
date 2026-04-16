import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
export declare class Migration710RarityToString extends MigrationBase {
    static version: number;
    private updateTraits;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
