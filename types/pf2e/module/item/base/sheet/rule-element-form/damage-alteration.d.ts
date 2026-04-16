import type { DamageAlterationRuleElement, DamageAlterationSource } from "@module/rules/rule-element/damage-alteration/rule-element.js";
import { RuleElementForm, RuleElementFormSheetData } from "./base.js";
/** Form handler for the DamageAlteration rule element */
export declare class DamageAlterationForm extends RuleElementForm<DamageAlterationSource, DamageAlterationRuleElement> {
    getData(): Promise<RuleElementFormSheetData<DamageAlterationSource, DamageAlterationRuleElement>>;
}
