import type { BaseCreatureSource, CreatureAttributes, CreatureDetails, CreatureLanguagesData, CreatureMovementData, CreaturePerceptionData, CreatureResources, CreatureSaves, CreatureTraitsData, SkillData } from "@actor/creature/data.js";
import { ActorSystemModel, ActorSystemSchema } from "@actor/data/model.js";
import type { Modifier } from "@actor/modifiers.js";
import type { AttributeString } from "@actor/types.js";
import type { ModelPropFromDataField, ModelPropsFromSchema, SourceFromDataField, SourceFromSchema } from "@common/data/fields.d.mts";
import type { StatisticTraceData } from "@system/statistic/data.js";
import type { FamiliarPF2e } from "./document.js";
import fields = foundry.data.fields;
type FamiliarSource = BaseCreatureSource<"familiar", FamiliarSystemSource>;
declare class FamiliarSystemData extends ActorSystemModel<FamiliarPF2e, FamiliarSystemSchema> {
    traits: CreatureTraitsData;
    perception: CreaturePerceptionData;
    saves: CreatureSaves;
    skills: Record<string, SkillData>;
    attack: StatisticTraceData;
    resources: CreatureResources;
    movement: CreatureMovementData;
    static defineSchema(): FamiliarSystemSchema;
    prepareBaseData(): void;
    prepareDerivedData(): void;
}
interface FamiliarSystemData extends foundry.abstract.TypeDataModel<FamiliarPF2e, FamiliarSystemSchema>, ModelPropsFromSchema<FamiliarSystemSchema> {
    attributes: CreatureAttributes;
    details: FamiliarDetails;
    customModifiers: Record<string, Modifier[]>;
}
type FamiliarSystemSchema = ActorSystemSchema & {
    master: fields.SchemaField<{
        id: fields.ForeignDocumentField<string, true, true, true>;
        ability: fields.StringField<AttributeString, AttributeString, true, true, true>;
    }>;
    attributes: fields.SchemaField<{
        hp: fields.SchemaField<{
            value: fields.NumberField<number, number, true, false, true>;
            temp: fields.NumberField<number, number, true, false, true>;
        }>;
    }>;
    details: fields.SchemaField<{
        creature: fields.SchemaField<{
            value: fields.StringField<string, string, true, false, true>;
        }>;
    }>;
};
interface FamiliarSystemSource extends SourceFromSchema<FamiliarSystemSchema> {
    attributes: FamiliarAttributesSource;
    details: FamiliarDetailsSource;
    customModifiers?: never;
    perception?: never;
    resources?: never;
    saves?: never;
    skills?: never;
    traits?: never;
    /** Legacy location of `MigrationRecord` */
    schema?: object;
}
interface FamiliarAttributesSource extends SourceFromDataField<FamiliarSystemSchema["attributes"]> {
    immunities?: never;
    weaknesses?: never;
    resistances?: never;
}
interface FamiliarDetailsSource extends SourceFromDataField<FamiliarSystemSchema["details"]> {
    alliance?: never;
    languages?: never;
    level?: never;
}
interface FamiliarDetails extends ModelPropFromDataField<FamiliarSystemSchema["details"]>, CreatureDetails {
    languages: CreatureLanguagesData;
}
export { FamiliarSystemData };
export type { FamiliarSource, FamiliarSystemSource };
