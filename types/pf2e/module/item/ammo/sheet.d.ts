import { ItemSheetOptions } from "@item/base/sheet/sheet.js";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical/sheet.js";
import { AmmoPF2e } from "./document.js";
declare class AmmoSheetPF2e extends PhysicalItemSheetPF2e<AmmoPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<AmmoSheetData>;
    activateListeners($html: JQuery): void;
}
interface AmmoSheetData extends PhysicalItemSheetData<AmmoPF2e> {
    canHaveUses: boolean;
    isSpecialAmmo: boolean;
    ammoTypes: foundry.applications.fields.FormSelectOption[];
}
export { AmmoSheetPF2e };
