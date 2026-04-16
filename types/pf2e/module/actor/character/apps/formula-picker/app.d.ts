import type { ActorPF2e, CharacterPF2e } from "@actor";
import type { CraftingAbility } from "@actor/character/crafting/ability.js";
import type { ResourceData } from "@actor/creature/index.js";
import type { ItemUUID } from "@common/documents/_module.d.mts";
import type { AbilityItemPF2e, FeatPF2e, PhysicalItemPF2e } from "@item";
import type { TraitChatData } from "@item/base/data/index.js";
import type { ItemType } from "@item/types.js";
import { Rarity } from "@module/data.js";
import { type SvelteApplicationRenderContext } from "@module/sheet/mixin.svelte.js";
import MiniSearch from "minisearch";
interface FormulaPickerConfiguration extends fa.ApplicationConfiguration {
    actor: CharacterPF2e;
    ability: CraftingAbility;
    item?: FeatPF2e | AbilityItemPF2e;
    mode: "craft" | "prepare";
}
declare const FormulaPicker_base: (abstract new () => {
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
/** Creates a formula picker dialog that resolves with the selected item */
declare class FormulaPicker extends FormulaPicker_base {
    #private;
    static DEFAULT_OPTIONS: {
        id: string;
        position: {
            width: number;
            height: number;
        };
        window: {
            icon: string;
            contentClasses: string[];
            resizable: boolean;
        };
        onSelect: () => void;
        onDeselect: () => void;
    };
    options: FormulaPickerConfiguration;
    root: any;
    selection: PhysicalItemPF2e | null;
    constructor(options: Partial<FormulaPickerConfiguration>);
    get title(): string;
    /** Overriden to re-render when the actor re-renders */
    protected _onFirstRender(context: fa.ApplicationRenderContext, options: fa.ApplicationRenderOptions): Promise<void>;
    protected _onClose(options: fa.ApplicationClosingOptions): void;
    resolveSelection(): Promise<PhysicalItemPF2e | null>;
    protected _prepareContext(): Promise<FormulaPickerContext>;
}
interface FormulaPickerContext extends SvelteApplicationRenderContext {
    actor: ActorPF2e;
    ability: CraftingAbility;
    mode: "craft" | "prepare";
    onSelect: (uuid: ItemUUID) => void;
    onDeselect: (uuid: ItemUUID) => void;
    searchEngine: MiniSearch<Pick<PhysicalItemPF2e, "id" | "name">>;
    state: {
        name: string;
        resource: ResourceData | null;
        prompt: string;
        sections: FormulaSection[];
    };
}
interface FormulaSection {
    level: number;
    formulas: {
        item: FormulaViewData;
        /** The batch size or quantity prepared depending on context */
        quantity: number;
        selected: boolean;
    }[];
}
interface FormulaViewData {
    id: string;
    uuid: ItemUUID;
    type: ItemType;
    img: string;
    name: string;
    traits: TraitChatData[];
    level: number | null;
    rarity: Rarity | null;
}
export { FormulaPicker };
export type { FormulaPickerContext };
