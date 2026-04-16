import type { ActorPF2e } from "@actor";
import type { ModelPropsFromSchema, SourceFromSchema } from "@common/data/fields.mjs";
import type { WeaponTrait } from "@item/weapon/types.js";
import type { MigrationDataField } from "@module/data.js";
import type { RuleElementSource } from "@module/rules/index.js";
import type { DamageType } from "@system/damage/types.js";
import { PrunedSchemaField, SlugField } from "@system/schema-data-fields.js";
import type { ItemPF2e } from "../document.js";
import type { ItemDescriptionData } from "./system.js";
import fields = foundry.data.fields;
declare abstract class ItemSystemModel<TParent extends ItemPF2e, TSchema extends ItemSystemSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    static LOCALIZATION_PREFIXES: string[];
    static defineSchema(): ItemSystemSchema;
    get actor(): ActorPF2e | null;
}
interface ItemSystemModel<TParent extends ItemPF2e, TSchema extends ItemSystemSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    description: ItemDescriptionData;
}
type ItemSystemSchema = {
    description: fields.SchemaField<{
        value: fields.StringField<string, string, true, false, true>;
        gm: fields.StringField<string, string, true, false, true>;
    }>;
    publication: fields.SchemaField<{
        title: fields.StringField<string, string, true, false, true>;
        authors: fields.StringField<string, string, true, false, true>;
        license: fields.StringField<"OGL" | "ORC", "OGL" | "ORC", true, false, true>;
        remaster: fields.BooleanField;
    }>;
    rules: fields.ArrayField<fields.ObjectField<RuleElementSource, RuleElementSource, true, false, false>>;
    slug: SlugField<true, true, true>;
    traits: fields.SchemaField<{
        otherTags: fields.ArrayField<SlugField<true, false, false>>;
    }>;
    _migration: MigrationDataField;
};
declare class TraitConfigField extends PrunedSchemaField<TraitConfigSchema> {
    constructor();
}
type TraitConfigSchema = {
    modular: fields.ArrayField<fields.SchemaField<ModularConfigSchema>, SourceFromSchema<ModularConfigSchema>[], ModelPropsFromSchema<ModularConfigSchema>[], false, false>;
};
type ModularConfigSchema = {
    damageType: fields.StringField<DamageType, DamageType, true, false, true>;
    traits: fields.ArrayField<fields.StringField<WeaponTrait, WeaponTrait, true, false>>;
};
export { ItemSystemModel, TraitConfigField, type ItemSystemSchema };
