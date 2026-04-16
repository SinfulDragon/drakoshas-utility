import { ActorSystemSource, BaseActorSourcePF2e } from "@actor/data/base.js";
import { Immunity, ImmunitySource, Resistance, ResistanceSource, Weakness, WeaknessSource } from "@actor/data/iwr.js";
import { ActorSystemModel, ActorSystemSchema } from "@actor/data/model.js";
import { InitiativeTraceData } from "@actor/initiative.js";
import { ActorAlliance } from "@actor/types.js";
import { Rarity, ValueAndMax } from "@module/data.js";
import { AutoChangeEntry } from "@module/rules/rule-element/ae-like.js";
import { PerceptionTraceData } from "@system/statistic/perception.js";
import { ArmyPF2e } from "./document.js";
import { ArmyType } from "./types.js";
import fields = foundry.data.fields;
declare class ArmySystemData extends ActorSystemModel<ArmyPF2e, ArmySystemSchema> {
    static defineSchema(): ArmySystemSchema;
}
interface ArmySystemData extends ActorSystemModel<ArmyPF2e, ArmySystemSchema>, fields.ModelPropsFromSchema<ArmySystemSchema> {
    attributes: fields.ModelPropsFromSchema<ArmyAttributesSchema> & {
        hp: {
            max: number;
            negativeHealing: boolean;
            unrecoverable: number;
            details: string;
        };
        immunities: Immunity[];
        weaknesses: Weakness[];
        resistances: Resistance[];
        flanking: never;
    };
    initiative: InitiativeTraceData;
    details: fields.ModelPropsFromSchema<ArmyDetailsSchema> & {
        alliance: ActorAlliance;
    };
    perception: Pick<PerceptionTraceData, "senses">;
    traits: fields.ModelPropsFromSchema<ArmyTraitsSchema> & {
        size?: never;
    };
    resources: {
        ammunition: ValueAndMax;
        potions: ValueAndMax;
    } & Record<string, never>;
    /** An audit log of automatic, non-modifier changes applied to various actor data nodes */
    autoChanges: Record<string, AutoChangeEntry[] | undefined>;
}
type ArmySystemSchema = Omit<ActorSystemSchema, "attributes" | "traits" | "resources"> & {
    ac: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        potency: fields.NumberField<number, number, true, false, true>;
    }>;
    attributes: fields.SchemaField<ArmyAttributesSchema>;
    details: fields.SchemaField<ArmyDetailsSchema>;
    consumption: fields.NumberField<number, number, true, false, true>;
    scouting: fields.NumberField<number, number, true, false, true>;
    recruitmentDC: fields.NumberField<number, number, true, false, true>;
    saves: fields.SchemaField<{
        maneuver: fields.NumberField<number, number, true, false, true>;
        morale: fields.NumberField<number, number, true, false, true>;
    }>;
    weapons: fields.SchemaField<{
        ranged: fields.SchemaField<ArmyWeaponSchema, fields.SourceFromSchema<ArmyWeaponSchema>, fields.ModelPropsFromSchema<ArmyWeaponSchema>, true, true, true>;
        melee: fields.SchemaField<ArmyWeaponSchema, fields.SourceFromSchema<ArmyWeaponSchema>, fields.ModelPropsFromSchema<ArmyWeaponSchema>, true, true, true>;
    }>;
    resources: fields.SchemaField<{
        /** How often this army can use ranged attacks */
        ammunition: fields.SchemaField<{
            value: fields.NumberField<number, number, true, false, true>;
        }>;
        potions: fields.SchemaField<{
            value: fields.NumberField<number, number, true, false, true>;
        }>;
    }>;
    traits: fields.SchemaField<ArmyTraitsSchema>;
};
type ArmyAttributesSchema = {
    hp: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        temp: fields.NumberField<number, number, true, false, true>;
        max: fields.NumberField<number, number, true, false, true>;
        routThreshold: fields.NumberField<number, number, true, false, true>;
    }>;
};
type ArmyDetailsSchema = {
    level: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    description: fields.HTMLField;
};
type ArmyTraitsSchema = {
    value: fields.ArrayField<fields.StringField<string, string, true, false>>;
    rarity: fields.StringField<Rarity, Rarity, true, false>;
    type: fields.StringField<ArmyType, ArmyType, true, false>;
};
type ArmyWeaponSchema = {
    name: fields.StringField<string, string, true, false, false>;
    potency: fields.NumberField<number, number, true, false, true>;
};
interface ArmyAttributesSource extends fields.SourceFromSchema<ArmyAttributesSchema> {
    immunities?: ImmunitySource[];
    weaknesses?: WeaknessSource[];
    resistances?: ResistanceSource[];
    flanking?: never;
}
interface ArmyTraitSource extends fields.SourceFromSchema<ArmyTraitsSchema> {
    size?: never;
}
interface ArmySystemSource extends fields.SourceFromSchema<ArmySystemSchema> {
    attributes: ArmyAttributesSource;
    traits: ArmyTraitSource;
    /** Legacy location of `MigrationRecord` */
    schema?: ActorSystemSource["schema"];
}
type ArmySource = BaseActorSourcePF2e<"army", ArmySystemSource>;
export { ArmySystemData };
export type { ArmySource };
