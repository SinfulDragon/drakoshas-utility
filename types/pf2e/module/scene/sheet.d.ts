import type { ScenePF2e } from "./document.js";
export declare class SceneConfigPF2e<TDocument extends ScenePF2e> extends fa.sheets.SceneConfig<TDocument> {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<fa.api.DocumentSheetConfiguration>;
    static TABS: any;
    protected _configureRenderParts(options: fa.api.HandlebarsRenderOptions): Record<string, fa.api.HandlebarsTemplatePart>;
    /** Prepare context data for the system tab. */
    protected _preparePartContext(partId: string, context: fa.api.DocumentSheetRenderContext, options: fa.api.HandlebarsRenderOptions): Promise<fa.api.DocumentSheetRenderContext>;
    protected _onRender(context: Record<string, unknown>, options: fa.api.HandlebarsRenderOptions): Promise<void>;
    protected _prepareSubmitData(event: SubmitEvent, form: HTMLFormElement, formData: fa.ux.FormDataExtended, updateData?: Record<string, unknown>): Record<string, unknown>;
}
