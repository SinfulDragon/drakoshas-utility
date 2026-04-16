import type { ClientDocument } from "@client/documents/abstract/_module.d.mts";
import type { GrantItemRuleElement, GrantItemSource } from "@module/rules/rule-element/grant-item/rule-element.js";
import { RuleElementForm, RuleElementFormSheetData } from "./base.js";
/** Form handler for the GrantItem rule element */
declare class GrantItemForm extends RuleElementForm<GrantItemSource, GrantItemRuleElement> {
    template: string;
    getData(): Promise<GrantItemFormSheetData>;
    updateObject(ruleData: {
        key: string;
    } & Partial<Record<string, JSONValue>>): void;
}
interface GrantItemFormSheetData extends RuleElementFormSheetData<GrantItemSource, GrantItemRuleElement> {
    granted: ClientDocument | null;
}
export { GrantItemForm };
