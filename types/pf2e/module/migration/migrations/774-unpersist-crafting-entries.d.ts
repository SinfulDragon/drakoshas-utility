import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { PhysicalItemTrait } from "@item/physical/data.js";
import { PredicateStatement } from "@system/predication.js";
import { MigrationBase } from "../base.js";
/** Convert crafting entry `requiredTrait` properties to be predicates */
export declare class Migration774UnpersistCraftingEntries extends MigrationBase {
    static version: number;
    munitionsCrafterPredicate: OldRawPredicate;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    generatePredicateFromRequiredTraits(requiredTraits: PhysicalItemTrait[][]): OldRawPredicate;
}
interface OldRawPredicate {
    all?: PredicateStatement[];
    any?: PredicateStatement[];
    not?: PredicateStatement[];
}
export {};
