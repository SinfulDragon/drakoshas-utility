import { ItemSheetPF2e } from "@item";
import type { ItemSheetOptions } from "@item/base/sheet/sheet.js";
import type { ConditionPF2e } from "./document.js";
declare class ConditionSheetPF2e extends ItemSheetPF2e<ConditionPF2e> {
    static get defaultOptions(): ItemSheetOptions;
    protected get validTraits(): Record<string, string>;
}
export { ConditionSheetPF2e };
