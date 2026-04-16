import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Rename any predicate statement of "rage" or "panache" to a statement that the effect is present  */
export declare class Migration800SelfEffectPanacheRage extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
}
