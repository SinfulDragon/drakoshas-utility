import type { CharacterPF2e } from "@actor";
import type { AttributeBoosts } from "@actor/character/data.js";
import type { AttributeString } from "@actor/types.js";
import type { AncestryPF2e, BackgroundPF2e, ClassPF2e } from "@item";
import { type SvelteApplicationRenderContext } from "@module/sheet/mixin.svelte.js";
interface AttributeBuilderConfiguration extends fa.ApplicationConfiguration {
    actor: CharacterPF2e;
}
declare const AttributeBuilder_base: (abstract new () => {
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
declare class AttributeBuilder extends AttributeBuilder_base {
    #private;
    /** Number of attributes in the game (str, dex, con, int, wis, cha) */
    static ALL_ATTRIBUTES_COUNT: number;
    /** Maximum alternate ancestry boosts allowed */
    static MAX_ALTERNATE_ANCESTRY_BOOSTS: number;
    /** Maximum voluntary flaws in legacy mode */
    static MAX_VOLUNTARY_FLAWS_LEGACY: number;
    /** Threshold at which boosts become "partial" (require 2 boosts per +1) */
    static PARTIAL_BOOST_THRESHOLD: number;
    /** Minimum allowed manual attribute modifier */
    static MODIFIER_MIN: number;
    /** Maximum allowed manual attribute modifier */
    static MODIFIER_MAX: number;
    static DEFAULT_OPTIONS: DeepPartial<AttributeBuilderConfiguration>;
    options: AttributeBuilderConfiguration;
    protected root: any;
    protected _onFirstRender(context: AttributeBuilderContext, options: fa.ApplicationRenderOptions): Promise<void>;
    protected _tearDown(options: fa.ApplicationClosingOptions): void;
    protected _prepareContext(options: fa.ApplicationRenderOptions): Promise<AttributeBuilderContext>;
    toggleAlternateAncestryBoosts(): Promise<void>;
    toggleLegacyVoluntaryFlaw(): Promise<void>;
    handleAncestryBoost(attribute: AttributeString): Promise<void>;
    handleVoluntaryFlaw(attribute: AttributeString, action: "flaw" | "boost" | "doubleFlaw"): Promise<void>;
    handleBackgroundBoost(attribute: AttributeString): Promise<void>;
    handleClassKeyAttribute(attribute: AttributeString): Promise<void>;
    handleLevelBoost(attribute: AttributeString, level: 1 | 5 | 10 | 15 | 20): Promise<void>;
    handleApexBoost(attribute: AttributeString): Promise<void>;
    handleManualModChange(attribute: AttributeString, value: number): Promise<void>;
    toggleManualMode(): Promise<void>;
}
interface AttributeBuilderContext extends SvelteApplicationRenderContext {
    foundryApp: AttributeBuilder;
    state: AttributeBuilderState;
}
interface AttributeBuilderState {
    attributeModifiers: Record<AttributeString, {
        label: string;
        mod: string;
        rawMod: number;
    }>;
    ancestry: AncestryPF2e<CharacterPF2e> | null;
    background: BackgroundPF2e<CharacterPF2e> | null;
    class: ClassPF2e<CharacterPF2e> | null;
    build: AttributeBoosts;
    keyAttribute: AttributeString;
    currentLevel: number;
    abpEnabled: boolean;
    gradualBoostsVariant: boolean;
}
export { AttributeBuilder };
export type { AttributeBuilderContext, AttributeBuilderState };
