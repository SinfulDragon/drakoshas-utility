import type { AbilityViewData, ActorSheetDataPF2e } from "@actor/sheet/data-types.js";
import type { VehiclePF2e } from "@actor/vehicle/index.js";
import type { FormSelectOption } from "@client/applications/forms/fields.d.mts";
import type { ActorSheetOptions } from "@client/appv1/sheets/actor-sheet.d.mts";
import { AdjustedValue } from "@module/sheet/helpers.js";
import { ActorSheetPF2e } from "../sheet/base.js";
import type { VehicleSystemSchema } from "./data.js";
export declare class VehicleSheetPF2e extends ActorSheetPF2e<VehiclePF2e> {
    static get defaultOptions(): ActorSheetOptions;
    getData(): Promise<VehicleSheetData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface VehicleSheetData extends ActorSheetDataPF2e<VehiclePF2e> {
    actions: ActionsSheetData;
    actorRarities: typeof CONFIG.PF2E.rarityTraits;
    actorRarity: string;
    actorSizes: typeof CONFIG.PF2E.actorSizes;
    actorSize: string;
    ac: AdjustedValue;
    frequencies: typeof CONFIG.PF2E.frequencies;
    saves: {
        fortitude: AdjustedValue;
    };
    systemFields: VehicleSystemSchema;
    emitsSoundOptions: FormSelectOption[];
}
type ActionsSheetData = Record<"action" | "reaction" | "free", {
    label: string;
    actions: AbilityViewData[];
}>;
export {};
