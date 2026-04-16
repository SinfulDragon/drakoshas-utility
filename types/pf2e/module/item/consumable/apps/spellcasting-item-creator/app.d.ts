import { ActorPF2e } from "@actor";
import { SpellPF2e } from "@item/spell/document.js";
import { SvelteApplicationRenderContext } from "@module/sheet/mixin.svelte.js";
declare const SpellcastingItemCreator_base: (abstract new () => {
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
/** An application to create a scroll or wand out of a spell */
declare class SpellcastingItemCreator extends SpellcastingItemCreator_base {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<CreateSpellConsumableConfiguration>;
    root: any;
    constructor(options: CreateSpellConsumableConfiguration);
    protected _prepareContext(options: fa.ApplicationRenderOptions): Promise<CreateSpellConsumableContext>;
}
interface CreateSpellConsumableConfiguration extends DeepPartial<fa.ApplicationConfiguration> {
    actor: ActorPF2e;
    /** The spell we're creating the scroll/wand for */
    spell: SpellPF2e;
    /** The initial setting for whether or not to hide the created item's identification */
    mystified?: boolean;
}
interface CreateSpellConsumableContext extends SvelteApplicationRenderContext {
    foundryApp: SpellcastingItemCreator;
    state: {
        name: string;
        isCantrip: boolean;
        minimumRank: number;
        initialMystified: boolean;
    };
}
export { SpellcastingItemCreator };
export type { CreateSpellConsumableContext };
