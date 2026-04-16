import { CreatureSheetData, Language, ResourceData } from "@actor/creature/index.js";
import type { Sense } from "@actor/creature/sense.js";
import type { SheetClickActionHandlers } from "@actor/sheet/base.js";
import type { AbilityViewData, InventoryItem } from "@actor/sheet/data-types.js";
import type { AttributeString, SaveType } from "@actor/types.js";
import type { ActorSheetOptions } from "@client/appv1/sheets/actor-sheet.d.mts";
import type { AncestryPF2e, BackgroundPF2e, ClassPF2e, DeityPF2e, FeatPF2e, HeritagePF2e, PhysicalItemPF2e } from "@item";
import { ItemPF2e } from "@item";
import { TraitToggleViewData } from "@item/ability/trait-toggles.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import type { MagicTradition } from "@item/spell/types.js";
import type { SpellcastingSheetData } from "@item/spellcasting-entry/types.js";
import type { DropCanvasItemData } from "@module/canvas/drop-canvas-data.js";
import type { LabeledValueAndMax, ZeroToFour } from "@module/data.js";
import type { DamageType } from "@system/damage/types.js";
import { CreatureSheetPF2e } from "../creature/sheet.js";
import { CharacterConfig } from "./config.js";
import type { CraftingAbilitySheetData } from "./crafting/ability.js";
import { CharacterBiography, CharacterSaveData, CharacterStrike, CharacterSystemData, ClassDCData, MartialProficiency } from "./data.js";
import type { CharacterPF2e } from "./document.js";
import { ElementalBlastConfig } from "./elemental-blast.js";
import type { FeatGroup } from "./feats/index.js";
import { CHARACTER_SHEET_TABS } from "./values.js";
declare class CharacterSheetPF2e<TActor extends CharacterPF2e> extends CreatureSheetPF2e<TActor> {
    #private;
    protected readonly actorConfigClass: typeof CharacterConfig;
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(options?: ActorSheetOptions): Promise<CharacterSheetData<TActor>>;
    protected prepareInventoryItem(item: PhysicalItemPF2e): InventoryItem;
    /** Overriden to open sub-tabs if requested */
    protected openTab(name: string): void;
    activateListeners($html: JQuery): void;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
    /** Toggle availability of the roll-initiative link on the sidebar */
    toggleInitiativeLink(link?: HTMLElement | null): void;
    protected _onDropItem(event: DragEvent, data: DropCanvasItemData): Promise<ItemPF2e[]>;
    _onDrop(event: DragEvent): Promise<boolean | void>;
    /** Handle a drop event for an existing Owned Item to sort that item */
    protected _onSortItem(event: DragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface CharacterSheetPF2e<TActor extends CharacterPF2e> extends CreatureSheetPF2e<TActor> {
    getAttackActionFromDOM(target: HTMLElement): CharacterStrike | null;
}
type CharacterSheetOptions = ActorSheetOptions;
type CharacterSystemSheetData = CharacterSystemData & {
    details: CharacterSystemData["details"] & {
        keyability: {
            value: keyof typeof CONFIG.PF2E.abilities;
            singleOption: boolean;
        };
    };
    saves: Record<SaveType, CharacterSaveData & {
        rankName?: string;
        short?: string;
    }>;
};
interface FormulaSheetData {
    uuid: string;
    item: ItemPF2e;
    dc: number;
    batchSize: number;
    cost: string;
}
interface FormulaByLevel {
    level: string;
    formulas: FormulaSheetData[];
}
interface CraftingSheetData {
    noCost: boolean;
    hasQuickAlchemy: boolean;
    hasDailyCrafting: boolean;
    dailyCraftingComplete: boolean;
    knownFormulas: FormulaByLevel[];
    abilities: {
        spontaneous: CraftingAbilitySheetData[];
        prepared: CraftingAbilitySheetData[];
        alchemical: {
            entries: CraftingAbilitySheetData[];
            resource: ResourceData;
            resourceCost: number;
        };
    };
}
type CharacterSheetTabVisibility = Record<(typeof CHARACTER_SHEET_TABS)[number], boolean>;
type SpellcastingTabSlug = "known-spells" | "rituals" | "activations";
interface CharacterSheetData<TActor extends CharacterPF2e = CharacterPF2e> extends CreatureSheetData<TActor> {
    abpEnabled: boolean;
    ancestry: AncestryPF2e<CharacterPF2e> | null;
    heritage: HeritagePF2e<CharacterPF2e> | null;
    background: BackgroundPF2e<CharacterPF2e> | null;
    attributeBoostsAllocated: boolean;
    biography: CharacterBiography;
    class: ClassPF2e<CharacterPF2e> | null;
    numberToRank: Record<ZeroToFour, string>;
    classDCs: {
        dcs: ClassDCSheetData[];
        /** The slug of the character's primary class DC */
        primary: string | null;
        /** Show class label and individual modifier lists for each class DC */
        perDCDetails: boolean;
    };
    apexAttributeOptions: AttributeString[];
    crafting: CraftingSheetData;
    data: CharacterSystemSheetData;
    deity: DeityPF2e<CharacterPF2e> | null;
    hasStamina: boolean;
    /** This actor has actual containers for stowing, rather than just containers serving as a UI convenience */
    hasRealContainers: boolean;
    /** The resource to display in the header, usually hero points */
    headerResource: LabeledValueAndMax & {
        slug: string;
        icon: string;
    };
    languages: LanguageSheetData[];
    magicTraditions: Record<MagicTradition, string>;
    martialProficiencies: Record<"attacks" | "defenses", Record<string, MartialProficiency>>;
    options: CharacterSheetOptions;
    preparationType: object;
    showPFSTab: boolean;
    spellCollectionGroups: Record<SpellcastingTabSlug, SpellcastingSheetData[]>;
    hasNormalSpellcasting: boolean;
    tabVisibility: CharacterSheetTabVisibility;
    actions: {
        encounter: Record<"action" | "reaction" | "free", {
            label: string;
            actions: CharacterAbilityViewData[];
        }>;
        exploration: {
            active: CharacterAbilityViewData[];
            other: CharacterAbilityViewData[];
        };
        downtime: CharacterAbilityViewData[];
    };
    feats: FeatGroup[];
    elementalBlasts: ElementalBlastSheetConfig[];
    senses: Sense[];
    speeds: SpeedSheetData[];
}
type LanguageSheetData = {
    slug: Language | null;
    label: string;
    tooltip: string | null;
    overLimit: boolean;
};
interface SpeedSheetData {
    slug: string;
    icon: string;
    action: string | null;
    label: string;
    value: number | null;
    breakdown: string | null;
}
interface CharacterAbilityViewData extends AbilityViewData {
    feat: FeatPF2e | null;
    toggles: TraitToggleViewData[];
    exploration?: {
        active: boolean;
    };
}
interface ClassDCSheetData extends ClassDCData {
    icon: string;
    hover: string;
}
interface ElementalBlastSheetConfig extends ElementalBlastConfig {
    damageType: DamageType;
    formula: {
        ranged: {
            damage: string | null;
            critical: string | null;
        };
        melee: {
            damage: string | null;
            critical: string | null;
        };
    };
}
export { CharacterSheetPF2e };
export type { CharacterSheetData, CharacterSheetTabVisibility };
