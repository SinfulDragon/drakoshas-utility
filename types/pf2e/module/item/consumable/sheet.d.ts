import type { FormSelectOption } from "@client/applications/forms/fields.d.mts";
import { ItemSheetOptions } from "@item/base/sheet/sheet.js";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical/index.js";
import { SheetOptions } from "@module/sheet/helpers.js";
import { DamageType } from "@system/damage/index.js";
import type { ConsumablePF2e } from "./document.js";
import { ConsumableCategory } from "./types.js";
declare class ConsumableSheetPF2e extends PhysicalItemSheetPF2e<ConsumablePF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ConsumableSheetData>;
    activateListeners($html: JQuery): void;
}
interface ConsumableSheetData extends PhysicalItemSheetData<ConsumablePF2e> {
    canHaveDamageOrHealing: boolean;
    canHaveHealing: boolean;
    categories: Record<ConsumableCategory, string>;
    damageKindOptions: FormSelectOption[];
    damageTypes: Record<DamageType, string>;
    materialEffects: SheetOptions;
    otherTags: SheetOptions;
    embeddedSpell: {
        /** The embedded spell uuid, or null if this item *should* have a spell but doesn't */
        uuid: string | null;
        img?: string;
        name?: string;
        rank?: number;
    } | null;
}
export { ConsumableSheetPF2e };
