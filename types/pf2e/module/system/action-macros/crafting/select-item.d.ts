import type { PhysicalItemPF2e } from "@item";
import { type SvelteApplicationRenderContext } from "@module/sheet/mixin.svelte.js";
type ItemAction = "craft" | "repair";
interface SelectItemConfiguration extends fa.ApplicationConfiguration {
    action: ItemAction;
}
declare const SelectItemDialog_base: (abstract new () => {
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
declare class SelectItemDialog extends SelectItemDialog_base {
    #private;
    selection: PhysicalItemPF2e | null;
    constructor(options: Partial<SelectItemConfiguration> & Required<Pick<SelectItemConfiguration, "action">>);
    static DEFAULT_OPTIONS: DeepPartial<SelectItemConfiguration>;
    root: any;
    protected $state: SelectItemState;
    get title(): string;
    protected _prepareContext(options: fa.ApplicationRenderOptions): Promise<SelectItemRenderContext>;
    resolveSelection(): Promise<PhysicalItemPF2e | null>;
    protected _onClose(options: fa.ApplicationClosingOptions): void;
    static getItem(action: ItemAction): Promise<PhysicalItemPF2e | null>;
}
interface SelectItemState {
    action: ItemAction;
}
interface SelectItemRenderContext extends SvelteApplicationRenderContext {
    foundryApp: SelectItemDialog;
    state: SelectItemState;
    resolve: (item: PhysicalItemPF2e | null) => void;
}
export { SelectItemDialog };
export type { ItemAction, SelectItemRenderContext };
