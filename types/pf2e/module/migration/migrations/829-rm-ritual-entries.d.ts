import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Remove ritual spellcasting entries */
export declare class Migration829RMRitualEntries extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
