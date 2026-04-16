import type { DataFieldOptions } from "@common/data/_types.d.mts";
import { ItemPF2e } from "@item";
import type { ItemSourcePF2e } from "@item/base/data/index.js";
import type { ItemType } from "@item/types.js";
import { DataUnionField, PredicateField, SlugField, StrictNumberField } from "@system/schema-data-fields.js";
import { type AELikeChangeMode } from "../ae-like.js";
import { RuleElement } from "../index.js";
import fields = foundry.data.fields;
import validation = foundry.data.validation;
/** A `SchemaField` reappropriated for validation of specific item alterations */
declare class ItemAlterationHandler<TSchema extends AlterationSchema> extends fields.SchemaField<TSchema> {
    #private;
    operableOnInstances: boolean;
    operableOnSource: boolean;
    /** A registered handler function for the item alteration. The validation should be performed inside */
    handle: (data: AlterationApplicationData) => void;
    constructor(options: AlterationFieldOptions<TSchema> & {
        fields: TSchema;
    });
    /**
     * A type-safe affirmation of full validity of an alteration _and_ its applicable to a particular item
     * Errors will bubble all the way up to the originating parent rule element
     */
    isValid(data: {
        item: ItemPF2e | ItemSourcePF2e;
        rule: RuleElement;
        fromEquipment: boolean;
        alteration: MaybeAlterationData;
    }): data is {
        item: ItemOrSource<fields.SourceFromSchema<TSchema>["itemType"]>;
        rule: RuleElement;
        fromEquipment: boolean;
        alteration: fields.SourceFromSchema<TSchema>;
    };
}
type ItemOrSource<TItemType extends ItemType> = InstanceType<(typeof CONFIG.PF2E.Item.documentClasses)[TItemType]> | InstanceType<(typeof CONFIG.PF2E.Item.documentClasses)[TItemType]>["_source"];
type MaybeAlterationData = {
    mode: string;
    itemType: string;
    value: unknown;
};
interface AlterationApplicationData {
    item: ItemPF2e | ItemSourcePF2e;
    rule: RuleElement;
    fromEquipment: boolean;
    alteration: MaybeAlterationData;
}
declare const ITEM_ALTERATION_HANDLERS: {
    "ac-bonus": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "area-size": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "badge-max": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "badge-value": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    bulk: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: StrictNumberField<number, number, true, false, false>;
    }>;
    capacity: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    category: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "check-penalty": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: StrictNumberField<number, number, false, true, true>;
    }>;
    "damage-dice-faces": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: StrictNumberField<4 | 6 | 10 | 8 | 12, 4 | 6 | 10 | 8 | 12, true, true, true>;
    }>;
    "damage-dice-number": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "damage-type": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    /** The passive defense targeted by an attack spell */
    "defense-passive": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    description: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: fields.ArrayField<fields.SchemaField<{
            title: fields.StringField<string, string, false, true, true>;
            text: fields.StringField<string, string, true, false, false>;
            divider: fields.BooleanField<boolean, boolean, false, false, true>;
            predicate: PredicateField<false>;
        }>, fields.SourceFromDataField<fields.SchemaField<{
            title: fields.StringField<string, string, false, true, true>;
            text: fields.StringField<string, string, true, false, false>;
            divider: fields.BooleanField<boolean, boolean, false, false, true>;
            predicate: PredicateField<false>;
        }>>[], fields.ModelPropFromDataField<fields.SchemaField<{
            title: fields.StringField<string, string, false, true, true>;
            text: fields.StringField<string, string, true, false, false>;
            divider: fields.BooleanField<boolean, boolean, false, false, true>;
            predicate: PredicateField<false>;
        }>>[], true, false, false>;
    }>;
    "dex-cap": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: StrictNumberField<number, number, false, true, true>;
    }>;
    "focus-point-cost": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: StrictNumberField<number, number, false, true, true>;
    }>;
    grade: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    group: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    hardness: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "hp-max": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "material-type": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "pd-recovery-dc": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "persistent-damage": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    rarity: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "range-increment": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "range-max": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "frequency-max": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "frequency-per": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "other-tags": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: SlugField<true, false, boolean>;
    }>;
    name: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "runes-potency": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "runes-resilient": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "runes-striking": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: any;
    }>;
    "speed-penalty": ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: StrictNumberField<number, number, false, true, true>;
    }>;
    strength: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: StrictNumberField<number, number, false, true, true>;
    }>;
    traits: ItemAlterationHandler<{
        itemType: any;
        mode: any;
        value: DataUnionField<any, true, false, boolean>;
    }>;
};
interface AlterationFieldOptions<TSchema extends AlterationSchema, TSourceProp extends fields.SourceFromSchema<TSchema> = fields.SourceFromSchema<TSchema>> extends DataFieldOptions<TSourceProp, true, false, false> {
    validateForItem?: (item: ItemPF2e | ItemSourcePF2e, alteration: MaybeAlterationData) => validation.DataModelValidationFailure | void;
    /** Whether this alteration can be used with an `ItemPF2e` instance */
    operableOnInstances?: boolean;
    /** Whether this alteration can be used with item source data */
    operableOnSource?: boolean;
    handle: (this: ItemAlterationHandler<TSchema>, data: AlterationApplicationData) => void;
}
type AlterationSchema = {
    itemType: fields.StringField<ItemType, ItemType, true, false, false>;
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    value: fields.DataField<Exclude<JSONValue, undefined>, Exclude<JSONValue, undefined>, true, boolean, boolean>;
};
export { ITEM_ALTERATION_HANDLERS, ItemAlterationHandler };
export type { AlterationApplicationData, AlterationFieldOptions, AlterationSchema };
