import { Resistance } from "@actor/data/iwr.js";
import { ResistanceType } from "@actor/types.js";
import type { StrictArrayField } from "@system/schema-data-fields.js";
import { ModelPropsFromRESchema, ResolvableValueField, RuleValue } from "../data.js";
import { IWRException, IWRExceptionField, IWRRuleElement, IWRRuleSchema } from "./base.js";
/** @category RuleElement */
declare class ResistanceRuleElement extends IWRRuleElement<ResistanceRuleSchema> {
    static defineSchema(): ResistanceRuleSchema;
    static get dictionary(): Record<ResistanceType, string>;
    get property(): Resistance[];
    getIWR(value: number): Resistance[];
}
interface ResistanceRuleElement extends IWRRuleElement<ResistanceRuleSchema>, ModelPropsFromRESchema<ResistanceRuleSchema> {
    value: RuleValue;
    type: ResistanceType[];
    exceptions: IWRException<ResistanceType>[];
}
type ResistanceRuleSchema = Omit<IWRRuleSchema, "exceptions"> & {
    value: ResolvableValueField<true, false, false>;
    exceptions: StrictArrayField<IWRExceptionField<ResistanceType>>;
    doubleVs: StrictArrayField<IWRExceptionField<ResistanceType>>;
};
export { ResistanceRuleElement };
