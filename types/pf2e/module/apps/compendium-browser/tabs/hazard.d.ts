import { CompendiumBrowser } from "../browser.js";
import { ContentTabName } from "../data.js";
import { CompendiumBrowserTab } from "./base.svelte.js";
import { HazardFilters } from "./data.js";
export declare class CompendiumBrowserHazardTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    tabLabel: string;
    filterData: HazardFilters;
    searchFields: string[];
    storeFields: string[];
    protected index: string[];
    constructor(browser: CompendiumBrowser);
    get isGMOnly(): boolean;
    protected loadData(): Promise<void>;
    protected prepareFilterData(): HazardFilters;
}
