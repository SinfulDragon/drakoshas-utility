import type { ItemSheetOptions } from "@item/base/sheet/sheet.js";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "@item/physical/index.js";
import type { TreasureSystemSchema } from "./data.js";
import type { TreasurePF2e } from "./document.js";
import type { TreasureCategory } from "./types.js";
export declare class TreasureSheetPF2e extends PhysicalItemSheetPF2e<TreasurePF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<TreasureSheetData>;
}
interface TreasureSheetData extends PhysicalItemSheetData<TreasurePF2e> {
    currencies: ConfigPF2e["PF2E"]["currencies"];
    categories: Record<TreasureCategory, string>;
    systemFields: TreasureSystemSchema;
}
export {};
