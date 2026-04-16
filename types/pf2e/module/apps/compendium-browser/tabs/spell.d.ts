import { CompendiumBrowser } from "../browser.js";
import type { ContentTabName } from "../data.js";
import { CompendiumBrowserTab } from "./base.svelte.js";
import type { SpellFilters } from "./data.js";
export declare class CompendiumBrowserSpellTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    tabLabel: string;
    filterData: SpellFilters;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected prepareFilterData(): SpellFilters;
}
