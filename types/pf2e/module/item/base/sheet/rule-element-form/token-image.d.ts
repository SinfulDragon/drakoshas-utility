import { RuleElementSource } from "@module/rules/index.js";
import type { TokenImageRuleElement } from "@module/rules/rule-element/token-image.js";
import { RuleElementForm, RuleElementFormSheetData, RuleElementFormTabData } from "./base.js";
declare class TokenImageForm extends RuleElementForm<RuleElementSource, TokenImageRuleElement> {
    template: string;
    protected tabs: RuleElementFormTabData;
    getData(): Promise<TokenImageFormSheetData>;
    activateListeners(html: HTMLElement): void;
    updateObject(source: RuleElementSource & Partial<Record<string, JSONValue>>): void;
}
interface TokenImageFormSheetData extends RuleElementFormSheetData<RuleElementSource, TokenImageRuleElement> {
    alphaEnabled: boolean;
    scaleEnabled: boolean;
}
export { TokenImageForm };
