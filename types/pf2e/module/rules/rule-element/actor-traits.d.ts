import type { ActorType } from "@actor/types.js";
import { ModelPropsFromRESchema } from "./data.js";
import { RuleElement, RuleElementSchema } from "./index.js";
import fields = foundry.data.fields;
declare class ActorTraitsRuleElement extends RuleElement<ActorTraitsRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    static defineSchema(): ActorTraitsRuleSchema;
    onApplyActiveEffects(): void;
}
type ActorTraitsRuleSchema = RuleElementSchema & {
    add: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
    remove: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
};
interface ActorTraitsRuleElement extends RuleElement<ActorTraitsRuleSchema>, ModelPropsFromRESchema<ActorTraitsRuleSchema> {
}
export { ActorTraitsRuleElement };
