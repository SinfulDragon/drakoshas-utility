import { ItemSheetOptions } from "@item/base/sheet/sheet.js";
import { Coins, MaterialSheetData, PhysicalItemSheetData, PhysicalItemSheetPF2e, RUNE_DATA } from "@item/physical/index.js";
import type { ShieldPF2e } from "./document.js";
import { BaseShieldType } from "./types.js";
declare class ShieldSheetPF2e extends PhysicalItemSheetPF2e<ShieldPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ShieldSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface ShieldSheetData extends PhysicalItemSheetData<ShieldPF2e> {
    baseHardness: number;
    basePrice: Coins;
    baseTypes: Record<BaseShieldType, string>;
    canChangeMaterial: boolean;
    preciousMaterials: MaterialSheetData;
    propertyRuneSlots: {
        slug: string | null;
        label: string | null;
        adjusted: boolean;
        disabled: boolean;
    }[];
    reinforcing: Record<number, string | null>;
    weaponRunes: typeof RUNE_DATA.weapon | null;
    grades: Record<string, string>;
}
export { ShieldSheetPF2e };
