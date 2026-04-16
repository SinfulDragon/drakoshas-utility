import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Add roll options to abilities allowing one to ignore the flat-footed condition from being flanked */
export declare class Migration719ShrugFlanking extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e, actorSource?: ActorSourcePF2e): Promise<void>;
}
