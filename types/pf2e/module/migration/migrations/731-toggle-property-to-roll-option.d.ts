import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { Migration727TrimSelfRollOptions } from "./727-trim-self-roll-options.js";
/** Retire ToggleProperty rule element, converting them to toggleable RollOption ones */
export declare class Migration731TogglePropertyToRollOption extends Migration727TrimSelfRollOptions {
    static version: number;
    protected optionPattern: RegExp;
    protected optionReplacement: string;
    pathPattern: RegExp;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
