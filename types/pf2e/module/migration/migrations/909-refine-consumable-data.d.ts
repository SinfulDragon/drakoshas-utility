import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Crunch down some needless "value objects" in consumable data, expand damage formula data */
export declare class Migration909RefineConsumableData extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
