import type { ActorPF2e } from "@actor";
import type { ApplicationRenderContext } from "@client/applications/_module.d.mts";
import type { DocumentSheetConfiguration, DocumentSheetRenderContext } from "@client/applications/api/_module.d.mts";
import type { HandlebarsRenderOptions } from "@client/applications/api/handlebars-application.d.mts";
import type { TokenApplicationMixin } from "@client/applications/sheets/_module.d.mts";
import type { DocumentFlags } from "@common/data/_module.d.mts";
import type { TokenDocumentPF2e } from "../document.js";
import type { PrototypeTokenConfigPF2e } from "./prototype-config.js";
declare function TokenConfigMixinPF2e<TBase extends ReturnType<typeof TokenApplicationMixin>>(Base: TBase): ((abstract new () => (abstract new () => {
    _preview: import("@client/documents/token.mjs").default | import("@common/data/data.mjs").PrototypeToken<import("@client/documents/actor.mjs").default> | null;
    isPrototype: boolean;
    get actor(): import("@client/documents/actor.mjs").default | null;
    get token(): import("@client/documents/token.mjs").default | import("@common/data/data.mjs").PrototypeToken<import("@client/documents/actor.mjs").default>;
    get _fields(): import("@common/abstract/_types.mjs").DataSchema;
    _initializeTokenPreview(): Promise<void>;
    _preFirstRender(context: Record<string, unknown>, options: HandlebarsRenderOptions): Promise<void>;
    _previewChanges(changes: Record<string, unknown>): void;
    _prepareContext(options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
    _preparePartContext(partId: string, context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
    _prepareIdentityTab(): object;
    _prepareAppearanceTab(): Promise<object>;
    _prepareVisionTab(): Promise<object>;
    _prepareLightTab(): Promise<object>;
    _prepareResourcesTab(): Promise<object>;
    _prepareButtons(): import("@client/applications/_types.mjs").FormFooterButton[];
    _onChangeForm(formConfig: import("@client/applications/_types.mjs").ApplicationFormConfiguration, event: Event): void;
    _processChanges(submitData: Record<string, unknown>): void;
}) & {
    get linkToActorSize(): boolean;
    get autoscale(): boolean;
    /** Get this token's dimensions were they linked to its actor's size */
    get dimensionsFromActorSize(): number;
    get rulesBasedVision(): boolean;
    _prepareContext(options: HandlebarsRenderOptions): Promise<TokenConfigContext>;
    /** Hide token-sight settings when rules-based vision is enabled */
    _onRender(context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<void>;
    "__#private@#swapDispositionField"(): void;
    "__#private@#disableVisionInputs"(): void;
    processFormData(data: Record<string, unknown>, form: HTMLFormElement): Record<string, unknown>;
    processSubmitData(submitData: Record<string, unknown>): Promise<void>;
    get actor(): ActorPF2e | null;
    get token(): TokenDocumentPF2e | PrototypeTokenPF2e;
    _preview: import("@client/documents/token.mjs").default | import("@common/data/data.mjs").PrototypeToken<import("@client/documents/actor.mjs").default> | null;
    isPrototype: boolean;
    get _fields(): import("@common/abstract/_types.mjs").DataSchema;
    _initializeTokenPreview(): Promise<void>;
    _preFirstRender(context: Record<string, unknown>, options: HandlebarsRenderOptions): Promise<void>;
    _previewChanges(changes: Record<string, unknown>): void;
    _preparePartContext(partId: string, context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
    _prepareIdentityTab(): object;
    _prepareAppearanceTab(): Promise<object>;
    _prepareVisionTab(): Promise<object>;
    _prepareLightTab(): Promise<object>;
    _prepareResourcesTab(): Promise<object>;
    _prepareButtons(): import("@client/applications/_types.mjs").FormFooterButton[];
    _onChangeForm(formConfig: import("@client/applications/_types.mjs").ApplicationFormConfiguration, event: Event): void;
    _processChanges(submitData: Record<string, unknown>): void;
    DEFAULT_OPTIONS: DeepPartial<import("@client/applications/_types.mjs").ApplicationConfiguration>;
    PARTS: Record<string, import("@client/applications/api/handlebars-application.d.mts").HandlebarsTemplatePart>;
    TABS: Record<string, import("@client/applications/_types.mjs").ApplicationTabsConfiguration>;
    get DISPLAY_MODES(): Record<string, string>;
    get TOKEN_DISPOSITIONS(): Record<string, string>;
    get TURN_MARKER_MODES(): Record<string, string>;
    get TOKEN_SHAPES(): Record<string, string>;
}) & {
    "__#private@#SIGHT_INPUT_NAMES": ("sight.angle" | "sight.brightness" | "sight.range" | "sight.saturation" | "sight.visionMode")[];
    DEFAULT_OPTIONS: DeepPartial<DocumentSheetConfiguration>;
    PARTS: any;
    "__#private@#onClickOpenAutomationSettings"(this: PrototypeTokenConfigPF2e): Promise<void>;
    /** Disable the range input for token scale and style to indicate as much */
    "__#private@#onClickToggleAutoscale"(this: PrototypeTokenConfigPF2e): Promise<void>;
    "__#private@#onClickToggleSizeLink"(this: PrototypeTokenConfigPF2e): Promise<void>;
    TABS: Record<string, import("@client/applications/_types.mjs").ApplicationTabsConfiguration>;
    get DISPLAY_MODES(): Record<string, string>;
    get TOKEN_DISPOSITIONS(): Record<string, string>;
    get TURN_MARKER_MODES(): Record<string, string>;
    get TOKEN_SHAPES(): Record<string, string>;
}) & TBase;
interface PrototypeTokenPF2e extends foundry.data.PrototypeToken<ActorPF2e> {
    flags: DocumentFlags & {};
}
interface TokenConfigContext extends DocumentSheetRenderContext {
    /** Whether the token can be linked to its actor's size */
    sizeLinkable: boolean;
    linkToSizeTitle: string;
    autoscaleTitle: string;
}
export { TokenConfigMixinPF2e };
export type { TokenConfigContext };
