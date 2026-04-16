import { FrequencyField } from "@item/ability/data.js";
import { ItemSystemModel, ItemSystemSchema } from "@item/base/data/model.js";
import { ActionType, BaseItemSourcePF2e, ItemSystemSource } from "@item/base/data/system.js";
import { OneToThree } from "@module/data.js";
import { SlugField } from "@system/schema-data-fields.js";
import { CampaignFeaturePF2e } from "./document.js";
import { KingmakerCategory, KingmakerTrait } from "./types.js";
import fields = foundry.data.fields;
type CampaignFeatureSource = BaseItemSourcePF2e<"campaignFeature", CampaignFeatureSystemSource>;
interface PrerequisiteTagData {
    value: string;
}
declare class CampaignFeatureSystemData extends ItemSystemModel<CampaignFeaturePF2e, CampaignFeatureSystemSchema> {
    static defineSchema(): CampaignFeatureSystemSchema;
    prepareBaseData(): void;
}
interface CampaignFeatureSystemData extends ItemSystemModel<CampaignFeaturePF2e, CampaignFeatureSystemSchema>, Omit<fields.ModelPropsFromSchema<CampaignFeatureSystemSchema>, "description"> {
}
type CampaignFeatureSystemSchema = Omit<ItemSystemSchema, "traits"> & {
    level: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    traits: fields.SchemaField<{
        value: fields.ArrayField<fields.StringField<KingmakerTrait, KingmakerTrait, true, false, false>>;
        otherTags: fields.ArrayField<SlugField<true, false, false>, string[], string[], true, false, true>;
    }>;
    campaign: fields.StringField<"kingmaker", "kingmaker", true, false, true>;
    category: fields.StringField<KingmakerCategory, KingmakerCategory, true, false>;
    actionType: fields.SchemaField<{
        value: fields.StringField<ActionType, ActionType, true, false, true>;
    }>;
    actions: fields.SchemaField<{
        value: fields.NumberField<OneToThree, OneToThree, true, true, true>;
    }>;
    prerequisites: fields.SchemaField<{
        value: fields.ArrayField<fields.SchemaField<{
            value: fields.StringField<string, string, true, false, false>;
        }>>;
    }>;
    location: fields.StringField<string, string, true, true, true>;
    frequency: FrequencyField;
};
type CampaignFeatureSystemSource = fields.SourceFromSchema<CampaignFeatureSystemSchema> & {
    schema?: ItemSystemSource["schema"];
};
export { CampaignFeatureSystemData };
export type { CampaignFeatureSource, CampaignFeatureSystemSource, PrerequisiteTagData };
