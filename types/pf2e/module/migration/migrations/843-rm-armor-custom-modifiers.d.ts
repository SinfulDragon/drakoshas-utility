import { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
/** Remove custom modifiers in the "armor" statistic */
export declare class Migration843RMArmorCustomModifiers extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
}
