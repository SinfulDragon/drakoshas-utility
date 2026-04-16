import { ItemSheetOptions } from "@item/base/sheet/sheet.js";
import { SheetOptions } from "@module/sheet/helpers.js";
import { ABCSheetData, ABCSheetPF2e } from "../abc/sheet.js";
import type { BackgroundPF2e } from "./document.js";
export declare class BackgroundSheetPF2e extends ABCSheetPF2e<BackgroundPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<BackgroundSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface BackgroundSheetData extends ABCSheetData<BackgroundPF2e> {
    trainedSkills: SheetOptions;
    selectedBoosts: Record<string, Record<string, string>>;
}
export {};
