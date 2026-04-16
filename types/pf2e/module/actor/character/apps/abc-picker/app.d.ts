import type { CharacterPF2e } from "@actor";
import type { ImageFilePath } from "@common/constants.d.mts";
import type { ItemUUID } from "@common/documents/_module.mts";
import type { ItemType } from "@item/types.js";
import { Rarity } from "@module/data.js";
import { type SvelteApplicationRenderContext } from "@module/sheet/mixin.svelte.js";
type AhBCDType = Extract<ItemType, "ancestry" | "heritage" | "background" | "class" | "deity">;
interface ABCPickerConfiguration extends fa.ApplicationConfiguration {
    actor: CharacterPF2e;
    itemType: AhBCDType;
}
interface ABCItemRef {
    name: string;
    originalName?: string;
    img: ImageFilePath;
    uuid: ItemUUID;
    rarity?: {
        slug: Rarity;
        label: string;
    };
    source: {
        name: string;
        /** Whether the source comes from an item's publication data or is simply the providing module */
        publication: boolean;
    };
    hidden: boolean;
}
interface ABCPickerContext extends SvelteApplicationRenderContext {
    actor: CharacterPF2e;
    foundryApp: ABCPicker;
    state: {
        prompt: string;
        itemType: AhBCDType;
        items: ABCItemRef[];
    };
}
declare const ABCPicker_base: (abstract new () => {
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
/** A `Compendium`-like application for presenting A(H)BCD options for a character */
declare class ABCPicker extends ABCPicker_base {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<ABCPickerConfiguration>;
    options: ABCPickerConfiguration;
    protected root: any;
    get title(): string;
    protected _initializeApplicationOptions(options: Partial<ABCPickerConfiguration>): ABCPickerConfiguration;
    protected _prepareContext(): Promise<ABCPickerContext>;
}
export { ABCPicker, type ABCPickerContext };
