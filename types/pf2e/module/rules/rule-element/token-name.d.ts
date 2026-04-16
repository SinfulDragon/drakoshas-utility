import { RuleElement } from "./base.js";
import { ModelPropsFromRESchema, RuleElementSchema } from "./data.js";
import fields = foundry.data.fields;
/**
 * Change the name representing an actor's token
 * @category RuleElement
 */
declare class TokenNameRuleElement extends RuleElement<TokenNameRuleSchema> {
    static autogenForms: boolean;
    static defineSchema(): TokenNameRuleSchema;
    afterPrepareData(): void;
}
interface TokenNameRuleElement extends RuleElement<TokenNameRuleSchema>, ModelPropsFromRESchema<TokenNameRuleSchema> {
}
type TokenNameRuleSchema = RuleElementSchema & {
    value: fields.StringField<string, string, true, false, false>;
};
export { TokenNameRuleElement };
