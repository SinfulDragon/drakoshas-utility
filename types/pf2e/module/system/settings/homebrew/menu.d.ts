import "@yaireo/tagify/dist/tagify.css";
import { PartialSettingsData, SettingsMenuPF2e } from "../menu.js";
import { CustomDamageData, HomebrewElementsSheetData, HomebrewKey, HomebrewTag, HomebrewTraitKey, LanguageSettings, ModuleHomebrewData } from "./data.js";
import { ReservedTermsRecord } from "./helpers.js";
import { LanguagesManager } from "./languages.js";
declare class HomebrewElements extends SettingsMenuPF2e {
    #private;
    static readonly namespace = "homebrew";
    languagesManager: LanguagesManager;
    static get reservedTerms(): ReservedTermsRecord;
    static get moduleData(): ModuleHomebrewData;
    static get SETTINGS(): string[];
    static get defaultOptions(): fav1.api.FormApplicationOptions;
    static register(): void;
    protected static get settings(): Record<HomebrewKey, PartialSettingsData>;
    activateListeners($html: JQuery): void;
    getData(): Promise<HomebrewElementsSheetData>;
    /** Tagify sets an empty input field to "" instead of "[]", which later causes the JSON parse to throw an error */
    protected _onSubmit(event: Event, options?: fav1.api.OnSubmitFormOptions): Promise<Record<string, unknown> | false>;
    protected _getSubmitData(updateData?: Record<string, unknown> | undefined): Record<string, unknown>;
    protected _updateObject(event: Event, data: Record<HomebrewTraitKey, HomebrewTag[]>): Promise<void>;
    onInit(): void;
}
type HomebrewSubmitData = {
    damageTypes: CustomDamageData[];
    languages: HomebrewTag<"languages">[];
    languageRarities: LanguageSettings;
} & Record<string, unknown> & {
    clear(): void;
};
interface HomebrewElements extends SettingsMenuPF2e {
    constructor: typeof HomebrewElements;
    cache: HomebrewSubmitData;
}
export { HomebrewElements };
