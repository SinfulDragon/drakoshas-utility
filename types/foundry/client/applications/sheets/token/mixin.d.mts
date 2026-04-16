import { ApplicationConfiguration, ApplicationFormConfiguration, ApplicationRenderContext, ApplicationTabsConfiguration, FormFooterButton } from "@client/applications/_types.mjs";
import ApplicationV2 from "@client/applications/api/application.mjs";
import Actor from "@client/documents/actor.mjs";
import TokenDocument from "@client/documents/token.mjs";
import { DataSchema } from "@common/abstract/_types.mjs";
import { PrototypeToken } from "@common/data/_module.mjs";
import { HandlebarsRenderOptions, HandlebarsTemplatePart } from "../../api/handlebars-application.mjs";
/**
 * A mixin for UI shared between TokenDocument and PrototypeToken sheets
 */
export default function TokenApplicationMixin<TBase extends AbstractConstructorOf<ApplicationV2> & {
    DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;
    TABS: Record<string, ApplicationTabsConfiguration>;
}>(Base: TBase): (abstract new () => {
    /**
     * Maintain a copy of the original to show a real-time preview of changes.
     */
    _preview: TokenDocument | PrototypeToken<Actor> | null;
    /**
     * Is the token a PrototypeToken?
     */
    isPrototype: boolean;
    /**
     * A reference to the Actor the token depicts
     */
    get actor(): Actor | null;
    /**
     * The TokenDocument or PrototypeToken
     */
    get token(): TokenDocument | PrototypeToken<Actor>;
    /**
     * The schema fields for this token DataModel
     */
    get _fields(): DataSchema;
    /**
     * Assign a preview clone for propagating form changes across the sheet and (if editing a TokenDocument) the
     * canvas.
     */
    _initializeTokenPreview(): Promise<void>;
    _preFirstRender(context: Record<string, unknown>, options: HandlebarsRenderOptions): Promise<void>;
    /**
     * Mimic changes to the Token document as if they were true document updates.
     * @param The changes to preview.
     */
    _previewChanges(changes: Record<string, unknown>): void;
    _prepareContext(options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
    _preparePartContext(partId: string, context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
    /**
     * Prepare data to be displayed in the Identity tab.
     */
    _prepareIdentityTab(): object;
    /**
     * Prepare data to be displayed in the Appearance tab.
     */
    _prepareAppearanceTab(): Promise<object>;
    /**
     * Prepare data to be displayed in the Vision tab.
     */
    _prepareVisionTab(): Promise<object>;
    /**
     * Prepare data to be displayed in the Vision tab.
     */
    _prepareLightTab(): Promise<object>;
    /**
     * Prepare data to be displayed in the Resources tab.
     */
    _prepareResourcesTab(): Promise<object>;
    /**
     * Prepare form submission buttons.
     */
    _prepareButtons(): FormFooterButton[];
    _onChangeForm(formConfig: ApplicationFormConfiguration, event: Event): void;
    /**
     * Process several fields from form submission data into proper model changes.
     * @param submitData Form submission data passed through {@link foundry.applications.ux.FormDataExtended}
     */
    _processChanges(submitData: Record<string, unknown>): void;
}) & {
    DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;
    PARTS: Record<string, HandlebarsTemplatePart>;
    TABS: Record<string, ApplicationTabsConfiguration>;
    /**
     * Localized Token Display Modes
     */
    get DISPLAY_MODES(): Record<string, string>;
    /**
     * Localized Token Dispositions
     */
    get TOKEN_DISPOSITIONS(): Record<string, string>;
    /**
     * Localized Token Turn Marker modes
     */
    get TURN_MARKER_MODES(): Record<string, string>;
    /**
     * Localized Token Shapes
     */
    get TOKEN_SHAPES(): Record<string, string>;
};
