import type { ActorType } from "@actor/types.js";
import { PredicateField } from "@system/schema-data-fields.js";
import { AELikeChangeMode } from "./ae-like.js";
import { RuleElement, RuleElementOptions } from "./base.js";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.js";
import fields = foundry.data.fields;
declare class AdjustStrikeRuleElement extends RuleElement<AdjustStrikeSchema> {
    protected static validActorTypes: ActorType[];
    constructor(data: AdjustStrikeSource, options: RuleElementOptions);
    static VALID_PROPERTIES: Set<"traits" | "materials" | "property-runes" | "range-increment" | "weapon-traits">;
    static defineSchema(): AdjustStrikeSchema;
    /** Instead of applying the change directly to a property path, defer it to a synthetic */
    beforePrepareData(): void;
}
interface AdjustStrikeRuleElement extends RuleElement<AdjustStrikeSchema>, ModelPropsFromRESchema<AdjustStrikeSchema> {
}
type AdjustStrikeSchema = RuleElementSchema & {
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    /** The property of the strike to adjust */
    property: fields.StringField<AdjustStrikeProperty, AdjustStrikeProperty, true, false, false>;
    /** The definition of the strike in terms of its item (weapon) roll options */
    definition: PredicateField;
    value: ResolvableValueField<true, false, false>;
};
type AdjustStrikeProperty = SetElement<(typeof AdjustStrikeRuleElement)["VALID_PROPERTIES"]>;
interface AdjustStrikeSource extends RuleElementSource {
    mode?: unknown;
    property?: unknown;
    definition?: unknown;
}
export { AdjustStrikeRuleElement };
