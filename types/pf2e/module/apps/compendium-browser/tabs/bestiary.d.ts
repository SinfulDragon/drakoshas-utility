import { CompendiumBrowser } from "../browser.js";
import { ContentTabName } from "../data.js";
import { CompendiumBrowserTab } from "./base.svelte.js";
import { BestiaryFilters } from "./data.js";
export declare class CompendiumBrowserBestiaryTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    tabLabel: string;
    filterData: BestiaryFilters;
    protected index: string[];
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    get isGMOnly(): boolean;
    protected loadData(): Promise<void>;
    protected prepareFilterData(): BestiaryFilters;
}
