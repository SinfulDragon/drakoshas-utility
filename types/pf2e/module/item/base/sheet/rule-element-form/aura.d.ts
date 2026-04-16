import type { ClientDocument } from "@client/documents/abstract/_module.d.mts";
import type { CompendiumIndexData } from "@client/documents/collections/compendium-collection.d.mts";
import type { HexColorString } from "@common/constants.d.mts";
import type { SourceFromSchema } from "@common/data/fields.d.mts";
import type { ItemPF2e } from "@item";
import type { AuraRuleElement, AuraRuleElementSchema } from "@module/rules/rule-element/aura.js";
import { RuleElementForm, RuleElementFormSheetData, RuleElementFormTabData } from "./base.js";
declare class AuraForm extends RuleElementForm<AuraRuleElementSource, AuraRuleElement> {
    #private;
    template: string;
    protected tabs: RuleElementFormTabData;
    get effectsArray(): AuraEffectSource[];
    protected getInitialValue(): object;
    activateListeners(html: HTMLElement): void;
    getData(): Promise<AuraSheetData>;
    protected onDrop(event: DragEvent, element: HTMLElement): Promise<ItemPF2e | null>;
    updateItem(updates: Partial<AuraRuleElementSource> | Record<string, unknown>): Promise<void>;
    updateObject(source: AuraRuleElementSource & Partial<Record<string, JSONValue>>): void;
}
interface AuraSheetData extends RuleElementFormSheetData<AuraRuleElementSource, AuraRuleElement> {
    affectsOptions: Record<string, string>;
    effects: AuraRuleElementSource["effects"] & {
        item: ClientDocument | CompendiumIndexData | null;
    }[];
    borderColor: HexColorString | null;
    highlightColor: HexColorString;
    saveTypes: ConfigPF2e["PF2E"]["saves"];
    isImageFile: boolean;
}
type AuraEffectSource = AuraRuleElementSource["effects"][number];
type AuraRuleElementSource = SourceFromSchema<AuraRuleElementSchema>;
export { AuraForm };
