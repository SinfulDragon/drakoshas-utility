import { ItemSheetOptions } from "@item/base/sheet/sheet.js";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical/index.js";
import { SheetOptions } from "@module/sheet/helpers.js";
import type { EquipmentPF2e } from "./document.js";
export declare class EquipmentSheetPF2e extends PhysicalItemSheetPF2e<EquipmentPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<EquipmentSheetData>;
}
interface EquipmentSheetData extends PhysicalItemSheetData<EquipmentPF2e> {
    otherTags: SheetOptions;
}
export {};
