import { RuleElement } from "./base.js";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.js";
import fields = foundry.data.fields;
/**
 * @category RuleElement
 */
declare class MultipleAttackPenaltyRuleElement extends RuleElement<MAPRuleSchema> {
    static autogenForms: boolean;
    static defineSchema(): MAPRuleSchema;
    beforePrepareData(): void;
}
interface MultipleAttackPenaltyRuleElement extends RuleElement<MAPRuleSchema>, ModelPropsFromRESchema<MAPRuleSchema> {
}
type MAPRuleSchema = RuleElementSchema & {
    selector: fields.StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, false>;
};
export { MultipleAttackPenaltyRuleElement };
