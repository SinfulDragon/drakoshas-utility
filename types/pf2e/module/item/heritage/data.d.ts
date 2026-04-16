import type { CreatureTrait } from "@actor/creature/index.js";
import type { ItemUUID } from "@client/documents/_module.d.mts";
import { ItemSystemModel, ItemSystemSchema } from "@item/base/data/model.js";
import type { BaseItemSourcePF2e, ItemSystemSource } from "@item/base/data/system.js";
import { RarityField } from "@module/model.js";
import { SlugField } from "@system/schema-data-fields.js";
import type { HeritagePF2e } from "./document.js";
import fields = foundry.data.fields;
type HeritageSource = BaseItemSourcePF2e<"heritage", HeritageSystemSource>;
declare class HeritageSystemData extends ItemSystemModel<HeritagePF2e, HeritageSystemSchema> {
    static defineSchema(): HeritageSystemSchema;
}
interface HeritageSystemData extends ItemSystemModel<HeritagePF2e, HeritageSystemSchema>, Omit<fields.ModelPropsFromSchema<HeritageSystemSchema>, "description"> {
    level?: never;
}
type HeritageSystemSchema = Omit<ItemSystemSchema, "traits"> & {
    traits: fields.SchemaField<{
        value: fields.ArrayField<fields.StringField<CreatureTrait, CreatureTrait, true, false, false>>;
        otherTags: fields.ArrayField<SlugField<true, false, false>>;
        rarity: RarityField;
    }>;
    ancestry: fields.SchemaField<HeritageAncestrySchema, fields.SourceFromSchema<HeritageAncestrySchema>, fields.ModelPropsFromSchema<HeritageAncestrySchema>, true, true>;
};
type HeritageAncestrySchema = {
    name: fields.StringField<string, string, true, false>;
    slug: SlugField<true, false, false>;
    uuid: fields.DocumentUUIDField<ItemUUID, true, false>;
};
type HeritageSystemSource = fields.SourceFromSchema<HeritageSystemSchema> & {
    level?: never;
    schema?: ItemSystemSource["schema"];
};
export { HeritageSystemData };
export type { HeritageSource, HeritageSystemSource };
