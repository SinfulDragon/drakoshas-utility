import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "@item/base/sheet/sheet.js";
import { KitEntryData } from "./data.js";
import { KitPF2e } from "./document.js";
declare class KitSheetPF2e extends ItemSheetPF2e<KitPF2e> {
    static get defaultOptions(): ItemSheetOptions;
    getData(options?: Partial<ItemSheetOptions>): Promise<KitSheetData>;
    protected _onDrop(event: DragEvent): Promise<void>;
    removeItem(event: PointerEvent): Promise<KitPF2e | null>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface KitSheetData extends ItemSheetDataPF2e<KitPF2e> {
    priceString: string;
    items: Record<string, KitEntrySheetData>;
}
interface KitEntrySheetData extends KitEntryData {
    fromWorld: boolean;
}
export { KitSheetPF2e };
