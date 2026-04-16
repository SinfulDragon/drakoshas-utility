import type { CompendiumDocument } from "@client/documents/_module.d.mts";
import type CompendiumCollection from "@client/documents/collections/compendium-collection.d.mts";
import type { CompendiumIndexData } from "@client/documents/collections/compendium-collection.d.mts";
import type { CompendiumBrowserSources } from "./browser.js";
declare class PackLoader {
    #private;
    loadedSources: string[];
    sourcesSettings: CompendiumBrowserSources;
    constructor();
    loadPacks(documentType: "Actor" | "Item", packs: string[], indexFields: string[]): AsyncGenerator<{
        pack: CompendiumCollection<CompendiumDocument>;
        index: Collection<string, CompendiumIndexData>;
    }, void, unknown>;
    updateSources(packs: string[]): Promise<void>;
    reset(): void;
    hardReset(packs: string[]): Promise<void>;
}
export { PackLoader };
