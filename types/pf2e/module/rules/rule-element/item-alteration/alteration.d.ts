import type { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import type { ItemSourcePF2e } from "@item/base/data/index.js";
import { AELikeChangeMode } from "../ae-like.js";
import type { RuleElement } from "../base.js";
import { ResolvableValueField } from "../data.js";
import { ITEM_ALTERATION_HANDLERS } from "./handlers.js";
import fields = foundry.data.fields;
declare class ItemAlteration extends foundry.abstract.DataModel<RuleElement, ItemAlterationSchema> {
    static defineSchema(): ItemAlterationSchema;
    get rule(): RuleElement;
    get actor(): ActorPF2e;
    /**
     * Apply this alteration to an item (or source)
     * @param item The item to be altered
     */
    applyTo(item: ItemPF2e<ActorPF2e> | ItemSourcePF2e): void;
}
interface ItemAlteration extends foundry.abstract.DataModel<RuleElement, ItemAlterationSchema>, fields.ModelPropsFromSchema<ItemAlterationSchema> {
}
type ItemAlterationSchema = {
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    property: fields.StringField<ItemAlterationProperty, ItemAlterationProperty, true, false, false>;
    value: ResolvableValueField<true, true, false>;
    /** Whether this alteration comes from equipment or an equipment effect */
    fromEquipment: fields.BooleanField;
};
type ItemAlterationProperty = keyof typeof ITEM_ALTERATION_HANDLERS;
export { ItemAlteration };
export type { ItemAlterationProperty, ItemAlterationSchema };
