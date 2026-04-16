import type { ModelPropsFromSchema, SourceFromSchema } from "@common/data/fields.mjs";
import type { MeleePF2e } from "@item";
import { ItemSystemModel, ItemSystemSchema, TraitConfigField } from "@item/base/data/model.js";
import type { BaseItemSourcePF2e, ItemFlagsPF2e, ItemSystemSource, ItemTraitsNoRarity, TraitConfig } from "@item/base/data/system.js";
import type { EffectAreaShape } from "@item/types.js";
import type { WeaponMaterialData } from "@item/weapon/data.js";
import type { WeaponPropertyRuneType } from "@item/weapon/types.js";
import type { DamageCategoryUnique, DamageType } from "@system/damage/types.js";
import { RecordField, SlugField } from "@system/schema-data-fields.js";
import type { NPCAttackActionType, NPCAttackTrait } from "./types.js";
import fields = foundry.data.fields;
type MeleeSource = BaseItemSourcePF2e<"melee", MeleeSystemSource> & {
    flags: DeepPartial<MeleeFlags>;
};
type MeleeFlags = ItemFlagsPF2e & {};
declare class MeleeSystemData extends ItemSystemModel<MeleePF2e, NPCAttackSystemSchema> {
    static LOCALIZATION_PREFIXES: string[];
    material: WeaponMaterialData;
    /** Weapon property runes (or rather the effects thereof) added via rule element */
    runes: {
        property: WeaponPropertyRuneType[];
    };
    static defineSchema(): NPCAttackSystemSchema;
    prepareBaseData(): void;
    static migrateData(source: Record<string, unknown>): Record<string, unknown>;
}
interface MeleeSystemData extends ItemSystemModel<MeleePF2e, NPCAttackSystemSchema>, Omit<fields.ModelPropsFromSchema<NPCAttackSystemSchema>, "description"> {
    traits: NPCAttackTraits;
}
type NPCAttackSystemSchema = Omit<ItemSystemSchema, "traits"> & {
    traits: fields.SchemaField<{
        otherTags: fields.ArrayField<SlugField<true, false, false>, string[], string[], true, false, true>;
        value: fields.ArrayField<fields.StringField<NPCAttackTrait, NPCAttackTrait, true, false, false>, NPCAttackTrait[], NPCAttackTrait[], true, false, true>;
        config: TraitConfigField;
    }>;
    action: fields.StringField<NPCAttackActionType, NPCAttackActionType, true, false, true>;
    area: fields.SchemaField<EffectAreaSchema, SourceFromSchema<EffectAreaSchema>, ModelPropsFromSchema<EffectAreaSchema>, true, true, true>;
    damageRolls: RecordField<fields.StringField<string, string, true, false, false>, fields.SchemaField<{
        damage: fields.StringField<string, string, true, false, false>;
        damageType: fields.StringField<DamageType, DamageType, true, false, true>;
        category: fields.StringField<DamageCategoryUnique, DamageCategoryUnique, true, true, true>;
    }>, true, false, true, true>;
    /** The base attack modifier for this attack  */
    bonus: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    attackEffects: fields.SchemaField<{
        value: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
    }>;
    range: fields.SchemaField<{
        increment: fields.NumberField<number, number, true, true, true>;
        max: fields.NumberField<number, number, true, true, true>;
    }, {
        increment: number | null;
        max: number | null;
    }, {
        increment: number | null;
        max: number | null;
    }, true, true, true>;
    subjectToMAP: fields.BooleanField;
};
type EffectAreaSchema = {
    type: fields.StringField<EffectAreaShape, EffectAreaShape, true, false, true>;
    value: fields.NumberField<number, number, true, false, true>;
};
type MeleeSystemSource = fields.SourceFromSchema<NPCAttackSystemSchema> & {
    level?: never;
    schema?: ItemSystemSource["schema"];
};
type NPCAttackDamage = fields.SourceFromSchema<NPCAttackSystemSchema>["damageRolls"]["string"];
type NPCAttackTraits = ItemTraitsNoRarity<NPCAttackTrait> & {
    config: TraitConfig;
};
export { MeleeSystemData };
export type { MeleeFlags, MeleeSource, MeleeSystemSource, NPCAttackDamage, NPCAttackTraits };
