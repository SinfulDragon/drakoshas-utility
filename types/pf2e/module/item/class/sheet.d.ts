import { ItemSheetOptions } from "@item/base/sheet/sheet.js";
import type { ClassPF2e } from "@item/class/document.js";
import { SheetOptions } from "@module/sheet/helpers.js";
import { ABCSheetData, ABCSheetPF2e } from "../abc/sheet.js";
export declare class ClassSheetPF2e extends ABCSheetPF2e<ClassPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ClassSheetData>;
}
interface ClassSheetData extends ABCSheetData<ClassPF2e> {
    proficiencyChoices: Record<number, string>;
    selectedKeyAbility: Record<string, string>;
    trainedSkills: SheetOptions;
    ancestryFeatLevels: SheetOptions;
    classFeatLevels: SheetOptions;
    generalFeatLevels: SheetOptions;
    skillFeatLevels: SheetOptions;
    skillIncreaseLevels: SheetOptions;
}
export {};
