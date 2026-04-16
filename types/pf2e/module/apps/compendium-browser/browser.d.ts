import { AbilityTrait, ActionCategory } from "@item/ability/index.js";
import type { ActionType } from "@item/base/data/index.js";
import { BaseSpellcastingEntry } from "@item/spellcasting-entry/index.js";
import { SvelteApplicationRenderContext } from "@module/sheet/mixin.svelte.js";
import { BrowserTab, BrowserTabs, ContentTabName, PackInfo, SourceInfo, TabData, TabName } from "./data.js";
import { PackLoader } from "./loader.js";
import { BrowserFilter } from "./tabs/data.js";
declare const CompendiumBrowser_base: (abstract new () => {
    root: any;
    $state: object;
    "__#private@#mount": object;
    _prepareContext(options: fa.ApplicationRenderOptions): Promise<SvelteApplicationRenderContext>;
    _renderHTML(context: SvelteApplicationRenderContext): Promise<SvelteApplicationRenderContext>;
    _replaceHTML(result: SvelteApplicationRenderContext, content: HTMLElement, options: fa.ApplicationRenderOptions): void;
    _onClose(options: fa.ApplicationClosingOptions): void;
}) & {
    DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
};
declare class CompendiumBrowser extends CompendiumBrowser_base {
    #private;
    /** The amount of rendered result items for initial loading and per load operation */
    static RESULT_LIMIT: number;
    protected $state: CompendiumBrowserState;
    root: any;
    activeTab: BrowserTab;
    dataTabsList: readonly ["action", "bestiary", "campaignFeature", "equipment", "feat", "hazard", "spell"];
    packLoader: PackLoader;
    settings: CompendiumBrowserSettings;
    tabs: BrowserTabs;
    tabsArray: BrowserTab[];
    constructor(options?: Partial<fa.ApplicationConfiguration>);
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    protected _onFirstRender(context: fa.ApplicationRenderContext, options: fa.ApplicationRenderOptions): Promise<void>;
    protected _onClose(options: fa.ApplicationClosingOptions): void;
    protected _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];
    protected _prepareContext(_options: fa.ApplicationRenderOptions): Promise<CompendiumBrowserContext>;
    resetListElement(): void;
    openTab(tabName: TabName, options?: CompendiumBrowserOpenTabOptions): Promise<void>;
    openActionTab(options: {
        types?: ActionType[];
        categories?: ActionCategory[];
        traits?: AbilityTrait[];
    }): Promise<void>;
    openSpellTab(entry: BaseSpellcastingEntry, maxRank?: number, category?: string | null): Promise<void>;
    initCompendiumList(): void;
    loadedPacks(tab: TabName): string[];
    loadedPacksAll(): string[];
    resetInitializedTabs(): Promise<void>;
}
interface CompendiumBrowserContext extends SvelteApplicationRenderContext {
    state: CompendiumBrowserState;
}
interface CompendiumBrowserState {
    /** Changing this will trigger a tab rerender. An empty string will show the landing page */
    activeTabName: ContentTabName | "";
    /** The result list HTML element */
    resultList: HTMLUListElement;
}
type CompendiumBrowserSettings = TabData<Record<string, PackInfo | undefined>>;
type CompendiumBrowserSourcesList = Record<string, SourceInfo | undefined>;
interface CompendiumBrowserSources {
    ignoreAsGM: boolean;
    showEmptySources: boolean;
    showUnknownSources: boolean;
    sources: CompendiumBrowserSourcesList;
}
interface CompendiumBrowserOpenTabOptions {
    /** Optional filter data for the opened tab */
    filter?: BrowserFilter;
    /** Hide the navigation element */
    hideNavigation?: boolean;
    /** Only show the given tabs in the navigation element. This will always include the openend tab */
    showTabs?: ContentTabName[];
}
export { CompendiumBrowser };
export type { CompendiumBrowserContext, CompendiumBrowserOpenTabOptions, CompendiumBrowserSettings, CompendiumBrowserSources, CompendiumBrowserState, };
