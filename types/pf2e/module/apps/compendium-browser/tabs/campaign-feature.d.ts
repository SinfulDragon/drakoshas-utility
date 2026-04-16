import { CompendiumBrowser } from "../browser.js";
import { ContentTabName } from "../data.js";
import { CompendiumBrowserTab } from "./base.svelte.js";
import { CampaignFeatureFilters } from "./data.js";
export declare class CompendiumBrowserCampaignFeaturesTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    tabLabel: string;
    filterData: CampaignFeatureFilters;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected prepareFilterData(): CampaignFeatureFilters;
}
