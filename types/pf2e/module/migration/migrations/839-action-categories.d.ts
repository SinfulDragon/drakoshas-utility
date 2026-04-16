import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** actionCategory changed from a value object to just a string */
export declare class Migration839ActionCategories extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
}
