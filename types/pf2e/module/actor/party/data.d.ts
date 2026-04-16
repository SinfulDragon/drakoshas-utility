import { CreatureReach } from "@actor/creature/index.js";
import type { ActorAttributes, ActorDetails, BaseActorSourcePF2e } from "@actor/data/base.js";
import { ActorSystemModel, ActorSystemSchema } from "@actor/data/model.js";
import type { ModelPropFromDataField, ModelPropsFromSchema, SourceFromDataField, SourceFromSchema } from "@common/data/fields.d.mts";
import type { ActorUUID } from "@common/documents/_module.d.mts";
import type { PartyPF2e } from "./document.js";
import type { KingdomSchema } from "./kingdom/schema.js";
import fields = foundry.data.fields;
type PartySource = BaseActorSourcePF2e<"party", PartySystemSource>;
declare class PartySystemData extends ActorSystemModel<PartyPF2e, PartySystemSchema> {
    static defineSchema(): PartySystemSchema;
    prepareBaseData(): void;
    prepareDerivedData(): void;
}
interface PartySystemData extends ActorSystemModel<PartyPF2e, PartySystemSchema>, ModelPropsFromSchema<PartySystemSchema> {
    attributes: PartyAttributes;
    details: PartyDetails;
    movement: PartyMovementData;
}
type PartySystemSchema = ActorSystemSchema & {
    details: fields.SchemaField<{
        description: fields.HTMLField;
        members: fields.ArrayField<fields.SchemaField<{
            uuid: fields.DocumentUUIDField<ActorUUID, true, false, false>;
        }>>;
    }>;
    campaign: fields.SchemaField<KingdomSchema, SourceFromSchema<KingdomSchema>, ModelPropsFromSchema<KingdomSchema>, false, true, true>;
};
interface PartySystemSource extends SourceFromSchema<PartySystemSchema> {
    details: PartyDetailsSource;
    attributes?: never;
    traits?: never;
    schema?: never;
}
interface PartyDetailsSource extends SourceFromDataField<PartySystemSchema["details"]> {
    readonly alliance?: never;
    readonly level?: never;
}
interface PartyAttributes extends Omit<ActorAttributes, "attributes" | "initiative" | "ac" | "hp"> {
    reach: CreatureReach;
    immunities: never[];
    weaknesses: never[];
    resistances: never[];
}
interface PartyMovementData {
    speeds: {
        travel: {
            value: number;
        };
    };
}
interface PartyDetails extends ModelPropFromDataField<PartySystemSchema["details"]>, ActorDetails {
}
type PartyCampaignSource = {
    type: string;
} & Record<string, JSONValue>;
export { PartySystemData };
export type { PartyAttributes, PartyCampaignSource, PartySource };
