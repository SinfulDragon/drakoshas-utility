import type { LootPF2e } from "@actor";
import type { ActorSheetDataPF2e, InventoryItem, SheetInventory } from "@actor/sheet/data-types.js";
import type { FormSelectOption } from "@client/applications/forms/fields.d.mts";
import type { ActorSheetOptions } from "@client/appv1/sheets/actor-sheet.d.mts";
import type { ActorSchema } from "@common/documents/actor.d.mts";
import type { PhysicalItemPF2e } from "@item";
import { ActorSheetPF2e } from "../sheet/base.js";
import type { LootSystemSchema } from "./data.js";
export declare class LootSheetPF2e<TActor extends LootPF2e> extends ActorSheetPF2e<TActor> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(): Promise<LootSheetDataPF2e<TActor>>;
    activateListeners($html: JQuery): void;
    protected prepareInventory(): SheetInventory;
    /** Hide coin item rows in merchant actors */
    protected prepareInventoryItem(item: PhysicalItemPF2e): InventoryItem;
}
interface LootSheetDataPF2e<TActor extends LootPF2e> extends ActorSheetDataPF2e<TActor> {
    hasActiveParty: boolean;
    isLoot: boolean;
    fields: ActorSchema;
    systemFields: LootSystemSchema;
    lootSheetTypeOptions: FormSelectOption[];
}
export {};
