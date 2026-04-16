import { CompendiumBrowser } from "../browser.js";
import { ContentTabName } from "../data.js";
import { CompendiumBrowserTab } from "./base.svelte.js";
import { ActionFilters } from "./data.js";
export declare class CompendiumBrowserActionTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    tabLabel: string;
    filterData: ActionFilters;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected prepareFilterData(): ActionFilters;
}
