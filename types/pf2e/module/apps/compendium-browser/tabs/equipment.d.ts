import { CompendiumBrowser } from "../browser.js";
import { ContentTabName } from "../data.js";
import { CompendiumBrowserTab } from "./base.svelte.js";
import { EquipmentFilters, RangesInputData } from "./data.js";
export declare class CompendiumBrowserEquipmentTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    tabLabel: string;
    filterData: EquipmentFilters;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    parseRangeFilterInput(name: string, lower: string, upper: string): RangesInputData["values"];
    protected prepareFilterData(): EquipmentFilters;
}
