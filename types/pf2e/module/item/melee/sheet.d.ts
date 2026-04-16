import type { DocumentSheetV1Options } from "@client/appv1/api/document-sheet-v1.d.mts";
import { ItemSheetDataPF2e, ItemSheetPF2e } from "@item/base/sheet/sheet.js";
import { EffectAreaShape } from "@item/types.js";
import { SheetOptions } from "@module/sheet/helpers.js";
import type { DamageCategoryUnique } from "@system/damage/types.js";
import type { MeleePF2e } from "./index.js";
export declare class MeleeSheetPF2e extends ItemSheetPF2e<MeleePF2e> {
    getData(options?: Partial<DocumentSheetV1Options>): Promise<MeleeSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface MeleeSheetData extends ItemSheetDataPF2e<MeleePF2e> {
    attackActions: Record<string, string>;
    areaShapes: Record<EffectAreaShape, string>;
    damageTypes: ConfigPF2e["PF2E"]["damageTypes"];
    damageCategories: Record<DamageCategoryUnique, string>;
    attackEffects: SheetOptions;
    /** The statistic value to display, based on whether it is a check or a save */
    modifierOrSave: {
        label: string;
        value: number;
    };
}
export {};
