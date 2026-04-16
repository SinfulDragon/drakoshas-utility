import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { Migration914MovePerceptionSenses } from "./914-move-perception-senses.js";
/** Move languages from traits to details. */
export declare class Migration915MoveLanguages extends Migration914MovePerceptionSenses {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
