import type { RawDamageDice, RawModifier } from "@actor/modifiers.js";
import type { ApplicationConfiguration } from "@client/applications/_types.d.mts";
import type { ChatContextFlag } from "@module/chat-message/data.js";
import { ChatMessagePF2e } from "@module/chat-message/document.js";
import { SvelteApplicationRenderContext } from "@module/sheet/mixin.svelte.js";
declare const RollInspector_base: (abstract new () => {
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
declare class RollInspector extends RollInspector_base {
    static DEFAULT_OPTIONS: {
        position: {
            width: number;
            height: number;
        };
        window: {
            icon: string;
            title: string;
            resizable: boolean;
        };
    };
    protected root: any;
    message: ChatMessagePF2e;
    constructor(options: DeepPartial<ApplicationConfiguration> & {
        message: ChatMessagePF2e;
    });
    protected _prepareContext(): Promise<RollInspectorContext>;
}
interface RollInspectorContext extends SvelteApplicationRenderContext {
    state: RollInspectorState;
}
interface RollInspectorState {
    context: ChatContextFlag;
    domains: string[];
    modifiers: RawModifier[];
    dice: RawDamageDice[];
    rollOptions: string[];
    contextualOptions: {
        header: string;
        options: string[];
    }[];
}
export { RollInspector };
export type { RollInspectorContext };
