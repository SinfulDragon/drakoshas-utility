import type { CreatureTrait, SenseAcuity, SenseType } from "@actor/creature/index.js";
import type { AttributeString, MovementType, SkillSlug } from "@actor/types.js";
import type { ImageFilePath } from "@common/constants.d.mts";
import type { WeaponDamage } from "@item/weapon/data.js";
import type { BaseWeaponType, WeaponCategory, WeaponGroup, WeaponTrait } from "@item/weapon/types.js";
import type { Size } from "@module/data.js";
import type { RawPredicate } from "@system/predication.js";
import type { RuleElementSource } from "../index.js";
import type { ImmunityRuleElement, ResistanceRuleElement, WeaknessRuleElement } from "../iwr/index.js";
interface BattleFormSource extends RuleElementSource {
    overrides?: BattleFormOverrides;
    canCast?: boolean;
    canSpeak?: boolean;
    /** Does the character have hands, allowing it to use manipulate actions? */
    hasHands?: boolean;
    /** Can the character utilize its own unarmed strikes? */
    ownUnarmed?: boolean;
}
interface BattleFormOverrides {
    traits?: CreatureTrait[];
    armorClass?: BattleFormAC;
    tempHP?: number | null;
    senses?: BattleFormSenses;
    size?: Size | null;
    speeds?: BattleFormSpeeds;
    skills?: BattleFormSkills;
    strikes?: Record<string, BattleFormStrike>;
    immunities?: Omit<ImmunityRuleElement["_source"], "key">[];
    weaknesses?: Omit<WeaknessRuleElement["_source"], "key">[];
    resistances?: Omit<ResistanceRuleElement["_source"], "key">[];
}
interface BattleFormAC {
    modifier?: string | number;
    ignoreCheckPenalty?: boolean;
    ignoreSpeedPenalty?: boolean;
}
interface BattleFormSense {
    acuity?: SenseAcuity;
    range?: number | null;
}
interface BattleFormSkill {
    modifier: string | number;
    ownIfHigher?: boolean;
}
type BattleFormSenses = {
    [K in SenseType]?: BattleFormSense;
};
type BattleFormSkills = {
    [K in SkillSlug]?: BattleFormSkill;
};
type BattleFormSpeeds = {
    [K in MovementType]?: number;
};
interface BattleFormStrike {
    label: string;
    img?: ImageFilePath;
    predicate?: RawPredicate;
    ability?: AttributeString;
    category: WeaponCategory;
    group: WeaponGroup | null;
    baseType?: BaseWeaponType | null;
    traits: WeaponTrait[];
    modifier: string | number;
    damage: WeaponDamage;
    ownIfHigher?: boolean;
    range?: {
        increment?: number | null;
        max?: number | null;
    };
}
interface BattleFormStrikeQuery {
    pack: string;
    query: string;
    modifier: number;
    ownIfHigher: boolean;
}
export type { BattleFormAC, BattleFormOverrides, BattleFormSenses, BattleFormSkills, BattleFormSource, BattleFormSpeeds, BattleFormStrike, BattleFormStrikeQuery, };
