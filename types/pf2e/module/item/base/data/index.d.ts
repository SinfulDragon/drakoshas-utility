import type { AbilitySource } from "@item/ability/data.js";
import type { AfflictionSource } from "@item/affliction/data.js";
import type { AmmoSource } from "@item/ammo/data.js";
import type { AncestrySource } from "@item/ancestry/data.js";
import type { ArmorSource } from "@item/armor/data.js";
import type { BackgroundSource } from "@item/background/data.js";
import type { BookSource } from "@item/book/data.js";
import type { CampaignFeatureSource } from "@item/campaign-feature/data.js";
import type { ClassSource } from "@item/class/data.js";
import type { ConditionSource } from "@item/condition/data.js";
import type { ConsumableSource } from "@item/consumable/data.js";
import type { ContainerSource } from "@item/container/data.js";
import type { DeitySource } from "@item/deity/data.js";
import type { EffectSource } from "@item/effect/data.js";
import type { EquipmentSource } from "@item/equipment/data.js";
import type { FeatSource } from "@item/feat/data.js";
import type { HeritageSource } from "@item/heritage/data.js";
import type { KitSource } from "@item/kit/data.js";
import type { LoreSource } from "@item/lore.js";
import type { MeleeSource } from "@item/melee/data.js";
import type { ShieldSource } from "@item/shield/data.js";
import type { SpellSource } from "@item/spell/data.js";
import type { SpellcastingEntrySource } from "@item/spellcasting-entry/data.js";
import type { TreasureSource } from "@item/treasure/data.js";
import type { WeaponSource } from "@item/weapon/data.js";
import type { PROFICIENCY_RANKS, Rarity } from "@module/data.js";
import type { ItemDescriptionData } from "./system.js";
type ProficiencyRank = (typeof PROFICIENCY_RANKS)[number];
type NonPhysicalItemType = "action" | "affliction" | "ancestry" | "background" | "campaignFeature" | "class" | "condition" | "deity" | "effect" | "feat" | "heritage" | "kit" | "lore" | "melee" | "spell" | "spellcastingEntry";
type AbstractEffectSource = EffectSource | ConditionSource | AfflictionSource;
type PhysicalItemSource = AmmoSource | ArmorSource | BookSource | ConsumableSource | ContainerSource | EquipmentSource | ShieldSource | TreasureSource | WeaponSource;
type ItemSourcePF2e = PhysicalItemSource | AbstractEffectSource | AbilitySource | AncestrySource | BackgroundSource | CampaignFeatureSource | ClassSource | DeitySource | FeatSource | HeritageSource | KitSource | LoreSource | MeleeSource | SpellSource | SpellcastingEntrySource;
type MagicItemSource = Exclude<PhysicalItemSource, ConsumableSource | TreasureSource>;
interface RawItemChatData {
    [key: string]: unknown;
    description: ItemDescriptionData;
    rarity?: {
        slug: Rarity;
        label: string;
        description: string;
    } | null;
    traits?: TraitChatData[];
    properties?: string[];
}
interface TraitChatData {
    value: string;
    label: string;
    description?: string;
    mystified?: boolean;
    excluded?: boolean;
}
export type { ActionCost, ActionType, Frequency, FrequencyInterval, FrequencySource, ItemFlagsPF2e, ItemSystemData, } from "./system.js";
export type { AbilitySource, AbstractEffectSource, AncestrySource, ArmorSource, BackgroundSource, BookSource, ClassSource, ConditionSource, ConsumableSource, ContainerSource, DeitySource, EffectSource, EquipmentSource, FeatSource, ItemSourcePF2e, KitSource, LoreSource, MagicItemSource, MeleeSource, NonPhysicalItemType, PhysicalItemSource, ProficiencyRank, RawItemChatData, ShieldSource, SpellcastingEntrySource, SpellSource, TraitChatData, TreasureSource, WeaponSource, };
