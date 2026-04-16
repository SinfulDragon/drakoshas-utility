import { ActorSheetPF2e, SheetClickActionHandlers } from "@actor/sheet/base.js";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types.js";
import { ItemSummaryRenderer } from "@actor/sheet/item-summary-renderer.js";
import type { ActorSheetOptions } from "@client/appv1/sheets/actor-sheet.d.mts";
import type { ClientDocument } from "@client/documents/abstract/_module.d.mts";
import { CampaignFeaturePF2e, ItemPF2e } from "@item";
import type { ItemSourcePF2e } from "@item/base/data/index.js";
import type { DropCanvasItemData } from "@module/canvas/drop-canvas-data.js";
import { AdjustedValue } from "@module/sheet/helpers.js";
import type { ArmyPF2e } from "./document.js";
declare class ArmySheetPF2e extends ActorSheetPF2e<ArmyPF2e> {
    #private;
    /** Basic war actions are sheet data. Note that they cannot ever work with rule elements */
    basicWarActions: CampaignFeaturePF2e[];
    itemRenderer: ArmyItemRenderer;
    static get defaultOptions(): ActorSheetOptions;
    getData(options?: Partial<ActorSheetOptions>): Promise<ArmySheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
    protected _onDropItem(event: DragEvent, data: DropCanvasItemData): Promise<ItemPF2e[]>;
    /** Handle a drop event for an existing Owned Item to sort that item */
    protected _onSortItem(event: DragEvent, itemSource: ItemSourcePF2e): Promise<ItemPF2e[]>;
}
declare class ArmyItemRenderer extends ItemSummaryRenderer<ArmyPF2e, ArmySheetPF2e> {
    protected getItemFromElement(element: HTMLElement): Promise<ClientDocument | null>;
}
interface ArmySheetData extends ActorSheetDataPF2e<ArmyPF2e> {
    description: string;
    ac: {
        value: number;
        breakdown: string;
        adjustmentClass: string | null;
    };
    consumption: AdjustedValue;
    hitPoints: {
        value: number;
        max: AdjustedValue;
        routThreshold: AdjustedValue;
    };
    linked: boolean;
    armyTypes: Record<string, string>;
    rarityTraits: Record<string, string>;
    saves: ArmySaveSheetData[];
    basicWarActions: CampaignFeaturePF2e[];
    warActions: CampaignFeaturePF2e[];
}
interface ArmySaveSheetData {
    slug: string;
    label: string;
    mod: number;
    breakdown: string;
    adjustmentClass: string | null;
}
export { ArmySheetPF2e };
