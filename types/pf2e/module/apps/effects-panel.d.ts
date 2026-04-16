import type { ActorPF2e } from "@actor";
import type { HandlebarsRenderOptions } from "@client/applications/api/handlebars-application.d.mts";
import { AbstractEffectPF2e } from "@item";
declare const EffectsPanel_base: any;
export declare class EffectsPanel extends EffectsPanel_base {
    #private;
    /**
     * Debounce and slightly delayed request to re-render this panel. Necessary for situations where it is not possible
     * to properly wait for promises to resolve before refreshing the UI.
     */
    refresh: any;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    protected _prepareContext(): Promise<EffectsPanelViewData>;
    protected _onFirstRender(context: EffectsPanelViewData, options: HandlebarsRenderOptions): Promise<void>;
    /** Move the panel to the right interface column. */
    _onRender(context: object, options: HandlebarsRenderOptions): Promise<void>;
}
interface EffectsPanelViewData extends fa.ApplicationRenderContext {
    afflictions: EffectViewData[];
    conditions: EffectViewData[];
    effects: EffectViewData[];
    actor: ActorPF2e | null;
    user: {
        isGM: boolean;
    };
}
interface EffectViewData {
    effect: AbstractEffectPF2e;
    description: string;
    remaining: string | null;
}
export {};
