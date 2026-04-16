import type { SaveType } from "@actor/types.js";
import type { ModelPropsFromSchema, SourceFromSchema } from "@common/data/fields.d.mts";
import type { ItemUUID } from "@common/documents/_module.d.mts";
import { type DurationDataSchema, EffectContextField } from "@item/abstract-effect/data.js";
import type { AbstractEffectSchema } from "@item/abstract-effect/index.js";
import type { EffectTrait, TimeUnit } from "@item/abstract-effect/types.js";
import { ItemSystemModel } from "@item/base/data/model.js";
import type { BaseItemSourcePF2e, ItemFlagsPF2e, ItemSourceFlagsPF2e, ItemSystemSource, ItemTraitsNoRarity } from "@item/base/data/system.js";
import type { ConditionSlug } from "@item/condition/index.js";
import type { DamageCategoryUnique, DamageType } from "@system/damage/types.js";
import type { AfflictionPF2e } from "./document.js";
import fields = foundry.data.fields;
type AfflictionSource = BaseItemSourcePF2e<"affliction", AfflictionSystemSource> & {
    flags: ItemSourceFlagsPF2e & {};
};
declare class AfflictionSystemData extends ItemSystemModel<AfflictionPF2e, AfflictionSystemSchema> {
    /** Whether or not the current affliction is expired */
    expired?: boolean;
    static defineSchema(): AfflictionSystemSchema;
    prepareBaseData(): void;
}
interface AfflictionSystemData extends ItemSystemModel<AfflictionPF2e, AfflictionSystemSchema>, Omit<ModelPropsFromSchema<AfflictionSystemSchema>, "description"> {
}
type AfflictionSystemSchema = AbstractEffectSchema & {
    level: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    save: fields.SchemaField<{
        type: fields.StringField<SaveType, SaveType, true, false, true>;
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    /** The current status of the affliction, including the current stage and whether it is currently in the onset phase */
    status: fields.SchemaField<{
        /** If true, this affliction is in the onset stage */
        onset: fields.BooleanField<boolean, boolean, true, false, true>;
        /** The current affliction stage, starting from 1. */
        stage: fields.NumberField<number, number, true, false, true>;
        /** Current progress towards recovering. Only relevant for virulent */
        progress: fields.NumberField<number, number, true, false, true>;
    }>;
    /** The onset time for this affliction */
    onset: fields.SchemaField<AfflictionOnsetSchema, SourceFromSchema<AfflictionOnsetSchema>, ModelPropsFromSchema<AfflictionOnsetSchema>, false, true, true>;
    /** The list of stages and what each stage does */
    stages: fields.ArrayField<fields.SchemaField<AfflictionStageSchema>>;
    /** The maximum duration of the affliction */
    duration: fields.SchemaField<DurationDataSchema>;
    /** When this data was applied during initiative */
    start: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        initiative: fields.NumberField<number, number, true, true, true>;
    }>;
    fromSpell: fields.BooleanField<boolean, boolean, true, false, true>;
    /** Origin, target, and roll context of the action that spawned this affliction */
    context: EffectContextField;
};
type AfflictionOnsetSchema = {
    value: fields.NumberField<number, number, true, false, true>;
    unit: fields.StringField<TimeUnit, TimeUnit, true, false>;
};
type AfflictionStageSchema = {
    damage: fields.ArrayField<fields.SchemaField<AfflictionDamageSchema>>;
    conditions: fields.ArrayField<fields.SchemaField<AfflictionConditionSchema>>;
    effects: fields.ArrayField<fields.SchemaField<{
        uuid: fields.DocumentUUIDField<ItemUUID, true, false>;
    }>>;
    duration: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        unit: fields.StringField<TimeUnit | "unlimited" | "encounter", TimeUnit | "unlimited" | "encounter", true, false, true>;
    }>;
};
type AfflictionDamageSchema = {
    formula: fields.StringField<string, string, true, false, false>;
    damageType: fields.StringField<DamageType, DamageType, true, false, true>;
    category: fields.StringField<DamageCategoryUnique, DamageCategoryUnique, false, true>;
};
type AfflictionConditionSchema = {
    slug: fields.StringField<ConditionSlug, ConditionSlug, true, false>;
    value: fields.NumberField<number, number, false, true, true>;
    /** Whether the condition should disappear when the stage changes. Defaults to true */
    linked: fields.BooleanField<boolean, boolean, false, false, true>;
};
type AfflictionSystemSource = SourceFromSchema<AfflictionSystemSchema> & {
    traits: ItemTraitsNoRarity<EffectTrait>;
    schema?: ItemSystemSource["schema"];
};
type AfflictionFlags = ItemFlagsPF2e & {};
type AfflictionDamage = ModelPropsFromSchema<AfflictionDamageSchema>;
type AfflictionStageData = ModelPropsFromSchema<AfflictionStageSchema>;
type AfflictionConditionData = ModelPropsFromSchema<AfflictionConditionSchema>;
type AfflictionExpiryType = "turn-end";
export { AfflictionSystemData };
export type { AfflictionConditionData, AfflictionDamage, AfflictionExpiryType, AfflictionFlags, AfflictionSource, AfflictionStageData, AfflictionSystemSource, };
