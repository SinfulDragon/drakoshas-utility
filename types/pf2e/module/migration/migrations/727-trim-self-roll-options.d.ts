import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Trim roll options with "self:" prefixes but are unnecessary for targeting */
export declare class Migration727TrimSelfRollOptions extends MigrationBase {
    #private;
    static version: number;
    protected optionPattern: RegExp;
    protected optionReplacement: string;
    protected trimPredicates(obj: Record<string, unknown>): Record<string, unknown>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
