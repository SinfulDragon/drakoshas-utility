import type { SkillSlug } from "@actor/types.js";
import type { FormSelectOption } from "@client/applications/forms/fields.d.mts";
import type { ItemUUID } from "@client/documents/_module.d.mts";
import type { ImageFilePath } from "@common/constants.d.mts";
import { type DeityPF2e } from "@item";
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "@item/base/sheet/sheet.js";
import { SheetOptions } from "@module/sheet/helpers.js";
export declare class DeitySheetPF2e extends ItemSheetPF2e<DeityPF2e> {
    static get defaultOptions(): ItemSheetOptions;
    getData(options?: Partial<ItemSheetOptions>): Promise<DeitySheetData>;
    activateListeners($html: JQuery): void;
    _onDrop(event: DragEvent): Promise<void>;
    /** Foundry inflexibly considers checkboxes to be booleans: set back to a string tuple for Divine Font */
    _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface DeitySheetData extends ItemSheetDataPF2e<DeityPF2e> {
    categories: FormSelectOption[];
    sanctifications: FormSelectOption[];
    skills: Record<SkillSlug, string>;
    divineFonts: SheetOptions;
    spells: SpellBrief[];
}
interface SpellBrief {
    uuid: ItemUUID;
    level: number;
    name: string;
    img: ImageFilePath;
}
export {};
