import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Convert EffectTarget REs into ChoiceSets */
export declare class Migration745EffectTargetToChoiceSet extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
}
