import type { JournalEntrySource } from "@client/documents/_module.d.mts";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Redirect links some to-be-deleted spells to replacements */
export declare class Migration887RedirectSpellLinks extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateJournalEntry(source: JournalEntrySource): Promise<void>;
}
