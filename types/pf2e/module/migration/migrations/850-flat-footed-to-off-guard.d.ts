import { ActorSourcePF2e } from "@actor/data/index.js";
import type { JournalEntrySource } from "@common/documents/_module.d.mts";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Rename all uses and mentions of "flat-footed" to "off-guard"  */
export declare class Migration850FlatFootedToOffGuard extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateJournalEntry(source: JournalEntrySource): Promise<void>;
}
