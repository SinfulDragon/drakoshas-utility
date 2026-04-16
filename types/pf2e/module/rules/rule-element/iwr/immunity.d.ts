import { Immunity } from "@actor/data/iwr.js";
import { ImmunityType } from "@actor/types.js";
import type { StrictArrayField } from "@system/schema-data-fields.js";
import { ModelPropsFromRESchema } from "../data.js";
import { IWRException, IWRExceptionField, IWRRuleElement, IWRRuleSchema } from "./base.js";
/** @category RuleElement */
declare class ImmunityRuleElement extends IWRRuleElement<ImmunityRuleSchema> {
    /** Immunities don't take values */
    readonly value: null;
    static defineSchema(): ImmunityRuleSchema;
    static get dictionary(): Record<ImmunityType, string>;
    get property(): Immunity[];
    getIWR(): Immunity[];
}
interface ImmunityRuleElement extends IWRRuleElement<ImmunityRuleSchema>, ModelPropsFromRESchema<ImmunityRuleSchema> {
    type: ImmunityType[];
    exceptions: IWRException<ImmunityType>[];
}
type ImmunityRuleSchema = Omit<IWRRuleSchema, "exceptions"> & {
    exceptions: StrictArrayField<IWRExceptionField<ImmunityType>>;
};
export { ImmunityRuleElement };
