import type { CreatureTrait } from "@actor/creature/index.js";
import { DamageDicePF2e, DamageDiceParameters, Modifier, ModifierAdjustment, ModifierObjectParams } from "@actor/modifiers.js";
import { ResistanceType } from "@actor/types.js";
import type { ArmorPF2e, MeleePF2e, PhysicalItemPF2e, WeaponPF2e } from "@item";
import { ArmorPropertyRuneType, ResilientRuneType } from "@item/armor/types.js";
import { SpellTrait } from "@item/spell/types.js";
import { StrikingRuneType, WeaponPropertyRuneType } from "@item/weapon/types.js";
import { OneToFour, Rarity, ZeroToFour, ZeroToSix } from "@module/data.js";
import { RollNoteSource } from "@module/notes.js";
import { StrikeAdjustment } from "@module/rules/synthetics.js";
import { DegreeOfSuccessAdjustment } from "@system/degree-of-success.js";
declare function getPropertyRuneSlots(item: WeaponPF2e | ArmorPF2e): ZeroToFour;
/** Remove duplicate and lesser versions from an array of property runes */
declare function prunePropertyRunes<T extends string>(runes: (string | null)[], validTypes: Record<T, unknown>): T[];
declare function getRuneValuationData(item: PhysicalItemPF2e): RuneData[];
declare function getPropertyRuneDegreeAdjustments(item: WeaponPF2e): DegreeOfSuccessAdjustment[];
declare function getPropertyRuneDamage(weapon: WeaponPF2e | MeleePF2e, runes: WeaponPropertyRuneType[], options: Set<string>): (DamageDicePF2e | Modifier)[];
declare function getPropertyRuneStrikeAdjustments(runes: WeaponPropertyRuneType[]): StrikeAdjustment[];
declare function getPropertyRuneModifierAdjustments(runes: WeaponPropertyRuneType[]): ModifierAdjustment[];
type RuneDiceProperty = "slug" | "damageType" | "category" | "predicate" | "critical";
type RuneAdditionalDamageDice = Partial<Pick<DamageDiceParameters, RuneDiceProperty>> & Required<Pick<DamageDiceParameters, "diceNumber" | "dieSize">>;
type RuneAdditionalDamageModifier = Omit<ModifierObjectParams, "modifier"> & {
    modifier: string | number;
};
type RuneAdditionalDamage = RuneAdditionalDamageDice | RuneAdditionalDamageModifier;
type RuneTrait = SpellTrait | CreatureTrait | "saggorak";
interface RuneData {
    name: string;
    level: number;
    price: number;
    rarity: Rarity;
    traits: RuneTrait[];
}
interface PotencyRuneData extends RuneData {
    value: OneToFour;
}
interface SecondaryFundamentalRuneData<TSlug extends string> extends RuneData {
    slug: TSlug;
}
interface ReinforcingRuneData extends RuneData {
    hardness: {
        increase: number;
        max: number;
    };
    maxHP: {
        increase: number;
        max: number;
    };
}
type FundamentalShieldRuneData = {
    reinforcing: Record<ZeroToSix, ReinforcingRuneData | null>;
};
interface PropertyRuneData<TSlug extends string> extends RuneData {
    slug: TSlug;
}
interface ArmorPropertyRuneData<TSlug extends ArmorPropertyRuneType> extends PropertyRuneData<TSlug> {
}
interface WeaponPropertyRuneData<TSlug extends WeaponPropertyRuneType> extends PropertyRuneData<TSlug> {
    attack?: {
        /** Degree-of-success adjustments */
        dosAdjustments?: DegreeOfSuccessAdjustment[];
        notes?: RuneNoteData[];
    };
    damage?: {
        additional?: RuneAdditionalDamage[];
        notes?: RuneNoteData[];
        adjustments?: ModifierAdjustment[];
        /**
         * A list of resistances this weapon's damage will ignore--not limited to damage from the rune.
         * If `max` is numeric, the resistance ignored will be equal to the lower of the provided maximum and the
         * target's resistance.
         */
        ignoredResistances?: {
            type: ResistanceType;
            max: number;
        }[];
    };
    strikeAdjustments?: Pick<StrikeAdjustment, "adjustTraits" | "adjustWeapon">[];
}
/** Title and text are mandatory for these notes */
interface RuneNoteData extends Pick<RollNoteSource, "outcome" | "predicate" | "title" | "text"> {
    title: string;
    text: string;
}
export declare const ARMOR_PROPERTY_RUNES: {
    [T in ArmorPropertyRuneType]: ArmorPropertyRuneData<T>;
};
declare const RUNE_DATA: {
    armor: {
        property: {
            [x: string]: ArmorPropertyRuneData<SetElement<Set<"acidResistant" | "advancing" | "aimAiding" | "antimagic" | "assisting" | "bitter" | "coldResistant" | "deathless" | "electricityResistant" | "energyAdaptive" | "ethereal" | "fireResistant" | "fortification" | "glamered" | "gliding" | "greaterAcidResistant" | "greaterAdvancing" | "greaterColdResistant" | "greaterDread" | "greaterElectricityResistant" | "greaterFireResistant" | "greaterFortification" | "greaterInvisibility" | "greaterQuenching" | "greaterReady" | "greaterShadow" | "greaterSlick" | "greaterStanching" | "greaterSwallowSpike" | "greaterWinged" | "immovable" | "implacable" | "invisibility" | "lesserDread" | "magnetizing" | "majorQuenching" | "majorShadow" | "majorSlick" | "majorStanching" | "majorSwallowSpike" | "malleable" | "misleading" | "moderateDread" | "portable" | "quenching" | "raiment" | "ready" | "rockBraced" | "shadow" | "sinisterKnight" | "sizeChanging" | "slick" | "spellwatch" | "soaring" | "stanching" | "swallowSpike" | "trueQuenching" | "trueStanching" | "winged">>>;
        };
        potency: Record<ZeroToFour, PotencyRuneData | null>;
        resilient: Record<ZeroToFour, SecondaryFundamentalRuneData<ResilientRuneType> | null>;
    };
    shield: FundamentalShieldRuneData;
    weapon: {
        property: {
            [x: string]: WeaponPropertyRuneData<SetElement<Set<"corrosive" | "shock" | "ancestralEchoing" | "anchoring" | "ashen" | "astral" | "authorized" | "bane" | "bloodbane" | "bloodthirsty" | "bolkasBlessing" | "brilliant" | "called" | "coating" | "conducting" | "crushing" | "cunning" | "dancing" | "deathdrinking" | "decaying" | "demolishing" | "disrupting" | "earthbinding" | "energizing" | "extending" | "fanged" | "fearsome" | "flaming" | "flickering" | "flurrying" | "frost" | "ghostTouch" | "giantKilling" | "greaterGiantKilling" | "greaterAnchoring" | "greaterAshen" | "greaterAstral" | "greaterBloodbane" | "greaterBolkasBlessing" | "greaterBrilliant" | "greaterCorrosive" | "greaterCrushing" | "greaterDecaying" | "greaterDisrupting" | "greaterExtending" | "greaterFanged" | "greaterFearsome" | "greaterFlaming" | "greaterFrost" | "greaterHauling" | "greaterImpactful" | "greaterKolssOath" | "greaterRooting" | "greaterShock" | "greaterThundering" | "greaterTruddsStrength" | "grievous" | "hauling" | "holy" | "hopeful" | "hooked" | "impactful" | "impossible" | "keen" | "kinWarding" | "kolssOath" | "majorFanged" | "majorRooting" | "merciful" | "nightmare" | "pacifying" | "returning" | "rooting" | "serrating" | "shifting" | "shockwave" | "speed" | "spellStoring" | "swarming" | "thundering" | "truddsStrength" | "trueRooting" | "underwater" | "unholy" | "vorpal" | "wounding">>>;
        };
        potency: Record<ZeroToFour, PotencyRuneData | null>;
        striking: Record<ZeroToFour, SecondaryFundamentalRuneData<StrikingRuneType> | null>;
    };
};
export { RUNE_DATA, getPropertyRuneDamage, getPropertyRuneDegreeAdjustments, getPropertyRuneModifierAdjustments, getPropertyRuneSlots, getPropertyRuneStrikeAdjustments, getRuneValuationData, prunePropertyRunes, };
export type { RuneData, WeaponPropertyRuneData };
