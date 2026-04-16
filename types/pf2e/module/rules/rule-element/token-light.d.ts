import type { LightDataSchema } from "@common/data/data.d.mts";
import type { SchemaField } from "@common/data/fields.d.mts";
import { RuleElement } from "./base.js";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.js";
import fields = foundry.data.fields;
/**
 * Add or change the light emitted by a token
 * @category RuleElement
 */
declare class TokenLightRuleElement extends RuleElement<TokenLightRuleSchema> {
    static defineSchema(): TokenLightRuleSchema;
    getLightData(): fields.SourceFromSchema<LightDataSchema> | null;
    afterPrepareData(): void;
}
interface TokenLightRuleElement extends RuleElement<TokenLightRuleSchema>, ModelPropsFromRESchema<TokenLightRuleSchema> {
}
type TokenLightValueSchema = Omit<LightDataSchema, "bright" | "color" | "dim"> & {
    bright: ResolvableValueField<false, false, false>;
    /** `LightData#color` as an injectable property */
    color: fields.StringField<string, string, false, true, true>;
    dim: ResolvableValueField<false, false, false>;
};
type TokenLightRuleSchema = RuleElementSchema & {
    value: SchemaField<TokenLightValueSchema>;
};
type TokenLightRuleSource = fields.SourceFromSchema<TokenLightRuleSchema>;
export { TokenLightRuleElement };
export type { TokenLightRuleSource };
