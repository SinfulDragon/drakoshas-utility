import type { ModelPropsFromSchema, SourceFromSchema } from "@common/data/fields.d.mts";
import { DurationDataSchema, EffectBadgeCounterSchema, EffectBadgeFormulaSchema, EffectBadgeValueSchema, EffectContextField } from "@item/abstract-effect/data.js";
import type { AbstractEffectSchema, EffectBadge } from "@item/abstract-effect/index.js";
import type { EffectTrait } from "@item/abstract-effect/types.js";
import { ItemSystemModel } from "@item/base/data/model.js";
import type { BaseItemSourcePF2e, ItemFlagsPF2e, ItemSourceFlagsPF2e, ItemSystemSource, ItemTraitsNoRarity } from "@item/base/data/system.js";
import type { EffectPF2e } from "./document.js";
import fields = foundry.data.fields;
type EffectSource = BaseItemSourcePF2e<"effect", EffectSystemSource> & {
    flags: ItemSourceFlagsPF2e & {};
};
declare class EffectSystemData extends ItemSystemModel<EffectPF2e, EffectSystemSchema> {
    static defineSchema(): EffectSystemSchema;
    prepareBaseData(): void;
}
interface EffectSystemData extends ItemSystemModel<EffectPF2e, EffectSystemSchema>, Omit<ModelPropsFromSchema<EffectSystemSchema>, "description" | "badge"> {
    expired: boolean;
    badge: EffectBadge | null;
    _source: EffectSystemSource;
}
declare class EffectBadgeField extends fields.TypedSchemaField<{
    counter: fields.SchemaField<EffectBadgeCounterSchema>;
    value: fields.SchemaField<EffectBadgeValueSchema>;
    formula: fields.SchemaField<EffectBadgeFormulaSchema>;
}, true, true, true> {
    constructor();
}
type EffectSystemSchema = AbstractEffectSchema & {
    level: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    duration: fields.SchemaField<DurationDataSchema & {
        sustained: fields.BooleanField<boolean, boolean, true, false, true>;
    }>;
    tokenIcon: fields.SchemaField<{
        show: fields.BooleanField<boolean, boolean, true, false, true>;
    }>;
    unidentified: fields.BooleanField<boolean, boolean, true, false, true>;
    /** When this data was applied during initiative */
    start: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        initiative: fields.NumberField<number, number, true, true, true>;
    }>;
    /** A numeric value or dice expression of some rules significance to the effect */
    badge: EffectBadgeField;
    /** Origin, target, and roll context of the action that spawned this effect */
    context: EffectContextField;
};
type EffectFlags = ItemFlagsPF2e & {};
type EffectSystemSource = SourceFromSchema<EffectSystemSchema> & {
    schema?: ItemSystemSource["schema"];
    traits: ItemTraitsNoRarity<EffectTrait>;
};
export { EffectSystemData };
export type { EffectFlags, EffectSource };
