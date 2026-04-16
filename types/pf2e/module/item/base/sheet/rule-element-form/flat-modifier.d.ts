import { ModifierType } from "@actor/modifiers.js";
import type { FormSelectOption } from "@client/applications/forms/fields.d.mts";
import type { FlatModifierRuleElement, FlatModifierSource } from "@module/rules/rule-element/flat-modifier.js";
import type { DamageCategoryUnique } from "@system/damage/types.js";
import { RuleElementForm, RuleElementFormSheetData } from "./base.js";
/** Form handler for the flat modifier rule element */
declare class FlatModifierForm extends RuleElementForm<FlatModifierSource, FlatModifierRuleElement> {
    template: string;
    get isDamage(): boolean;
    activateListeners(html: HTMLElement): void;
    getData(): Promise<FlatModifierFormSheetData>;
    updateObject(formData: {
        key: string;
    } & Partial<FlatModifierSource> & Partial<Record<string, JSONValue>>): void;
}
interface FlatModifierFormSheetData extends RuleElementFormSheetData<FlatModifierSource, FlatModifierRuleElement> {
    abilities: typeof CONFIG.PF2E.abilities;
    types: Record<ModifierType, string>;
    damageCategories: Record<DamageCategoryUnique, string>;
    isDamage: boolean;
    criticalOptions: FormSelectOption[];
}
export { FlatModifierForm };
