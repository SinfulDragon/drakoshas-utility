import type { ActorPF2e } from "@actor";
import type { DexterityModifierCapData } from "@actor/character/types.js";
import type { LabeledSpeed, SenseData } from "@actor/creature/data.js";
import type { DamageDicePF2e, DeferredDamageDiceOptions, DeferredPromise, DeferredValue, Modifier, ModifierAdjustment } from "@actor/modifiers.js";
import type { MovementType } from "@actor/types.js";
import type { TokenAnimationOptions } from "@client/_module.d.mts";
import type { TokenDocumentUUID } from "@client/documents/_module.d.mts";
import type { ImageFilePath, VideoFilePath } from "@common/constants.d.mts";
import type { TokenSource } from "@common/documents/token.d.mts";
import type { ItemPF2e, MeleePF2e, WeaponPF2e } from "@item";
import type { AbilityTrait } from "@item/ability/index.js";
import type { ConditionSource, EffectSource } from "@item/base/data/index.js";
import type { WeaponRuneSource } from "@item/weapon/data.js";
import type { WeaponPropertyRuneType } from "@item/weapon/types.js";
import type { ActiveEffectPF2e } from "@module/active-effect.js";
import type { RollNotePF2e } from "@module/notes.js";
import type { MaterialDamageEffect } from "@system/damage/types.js";
import type { DegreeOfSuccessAdjustment } from "@system/degree-of-success.js";
import type { Predicate } from "@system/predication.js";
import type { Statistic } from "@system/statistic/index.js";
import type { DamageAlteration } from "./rule-element/damage-alteration/alteration.js";
import type { ItemAlterationRuleElement } from "./rule-element/item-alteration/rule-element.js";
import type { Suboption } from "./rule-element/roll-option/data.js";
import type { SpecialResourceRuleElement } from "./rule-element/special-resource.js";
/** Defines a list of data provided by rule elements that an actor can pull from during its data preparation lifecycle */
interface RuleElementSynthetics {
    criticalSpecializations: {
        standard: CritSpecSynthetic[];
        alternate: CritSpecSynthetic[];
    };
    damageAlterations: Record<string, DamageAlteration[]>;
    damageDice: DamageDiceSynthetics;
    degreeOfSuccessAdjustments: Record<string, DegreeOfSuccessAdjustment[]>;
    dexterityModifierCaps: DexterityModifierCapData[];
    itemAlterations: ItemAlterationRuleElement[];
    ephemeralEffects: Record<string, {
        target: DeferredEphemeralEffect[];
        origin: DeferredEphemeralEffect[];
    } | undefined>;
    modifierAdjustments: ModifierAdjustmentSynthetics;
    modifiers: ModifierSynthetics;
    movementTypes: {
        [K in MovementType]?: DeferredMovementType[];
    };
    multipleAttackPenalties: Record<string, MAPSynthetic[]>;
    resources: Record<string, SpecialResourceRuleElement>;
    rollNotes: Record<string, RollNotePF2e[]>;
    rollSubstitutions: Record<string, RollSubstitution[]>;
    rollTwice: Record<string, RollTwiceSynthetic[]>;
    senses: SenseSynthetic[];
    statistics: Map<string, Statistic>;
    strikeAdjustments: StrikeAdjustment[];
    strikes: Record<string, DeferredStrike>;
    striking: Record<string, StrikingSynthetic[]>;
    toggles: Record<string, Record<string, RollOptionToggle>>;
    tokenEffectIcons: ActiveEffectPF2e<ItemPF2e>[];
    tokenMarks: Map<TokenDocumentUUID, string[]>;
    tokenOverrides: DeepPartial<Pick<TokenSource, "light" | "name">> & {
        alpha?: number | null;
        texture?: {
            src: ImageFilePath | VideoFilePath;
            tint?: Color | null;
        } | {
            src: ImageFilePath | VideoFilePath;
            tint?: Color | null;
            scaleX: number;
            scaleY: number;
        };
        ring?: {
            subject: TokenDocument["ring"]["subject"];
            colors: TokenDocument["ring"]["colors"];
            effects: TokenDocument["ring"]["effects"];
        };
        animation?: TokenAnimationOptions;
    };
    weaponPotency: Record<string, PotencySynthetic[]>;
}
type CritSpecEffect = (DamageDicePF2e | Modifier | RollNotePF2e)[];
type CritSpecSynthetic = (weapon: WeaponPF2e | MeleePF2e, options: Set<string>) => CritSpecEffect | null;
type DamageDiceSynthetics = {
    damage: DeferredDamageDice[];
} & Record<string, DeferredDamageDice[] | undefined>;
type ModifierSynthetics = Record<"all" | "damage", DeferredModifier[]> & Record<string, DeferredModifier[] | undefined>;
type ModifierAdjustmentSynthetics = {
    all: ModifierAdjustment[];
    damage: ModifierAdjustment[];
} & Record<string, ModifierAdjustment[] | undefined>;
type DeferredModifier = DeferredValue<Modifier>;
type DeferredDamageDice = (args: DeferredDamageDiceOptions) => DamageDicePF2e | null;
type DeferredMovementType = DeferredValue<BaseSpeedSynthetic | null>;
type DeferredEphemeralEffect = DeferredPromise<EffectSource | ConditionSource | null>;
type DeferredStrike = (runes?: WeaponRuneSource) => WeaponPF2e<ActorPF2e> | null;
interface BaseSpeedSynthetic extends Omit<LabeledSpeed, "label" | "type"> {
    type: MovementType;
    /**
     * Whether this speed is derived from a creature's land speed:
     * used as a cue to prevent double-application of modifiers
     */
    derivedFromLand: boolean;
}
interface MAPSynthetic {
    label: string;
    penalty: number;
    predicate: Predicate;
}
interface RollSubstitution {
    slug: string;
    label: string;
    predicate: Predicate;
    value: number;
    required: boolean;
    selected: boolean;
    effectType: "fortune" | "misfortune";
}
interface RollOptionToggle {
    /** The ID of the item with a rule element for this toggle */
    itemId: string;
    label: string;
    placement: string;
    domain: string;
    option: string;
    suboptions: Suboption[];
    alwaysActive: boolean;
    checked: boolean;
    enabled: boolean;
}
interface RollTwiceSynthetic {
    keep: "higher" | "lower";
    predicate: Predicate;
}
interface SenseSynthetic {
    sense: Required<SenseData>;
    predicate: Predicate;
    force: boolean;
}
interface StrikeAdjustment {
    adjustDamageRoll?: (weapon: WeaponPF2e | MeleePF2e, { materials }: {
        materials?: Set<MaterialDamageEffect>;
    }) => void;
    adjustWeapon?: (weapon: WeaponPF2e | MeleePF2e) => void;
    adjustTraits?: (weapon: WeaponPF2e | MeleePF2e, traits: AbilityTrait[]) => void;
}
interface StrikingSynthetic {
    label: string;
    bonus: number;
    predicate: Predicate;
}
interface PotencySynthetic {
    label: string;
    bonus: number;
    type: "item" | "potency";
    predicate: Predicate;
    property?: WeaponPropertyRuneType[];
}
export type { BaseSpeedSynthetic, CritSpecEffect, DamageDiceSynthetics, DeferredDamageDice, DeferredEphemeralEffect, DeferredModifier, DeferredMovementType, MAPSynthetic, ModifierAdjustmentSynthetics, ModifierSynthetics, PotencySynthetic, RollOptionToggle, RollSubstitution, RollTwiceSynthetic, RuleElementSynthetics, SenseSynthetic, StrikeAdjustment, StrikingSynthetic, };
