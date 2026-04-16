import type { ActorPF2e, CreaturePF2e } from "@actor";
import { ActorSheetDataPF2e } from "@actor/sheet/data-types.js";
import type { FormSelectOption } from "@client/applications/forms/fields.d.mts";
import type { ApplicationV1HeaderButton } from "@client/appv1/api/application-v1.d.mts";
import type { ActorSheetOptions } from "@client/appv1/sheets/actor-sheet.d.mts";
import { ItemPF2e } from "@item";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { SpellcastingSheetData } from "@item/spellcasting-entry/index.js";
import { DropCanvasItemData } from "@module/canvas/drop-canvas-data.js";
import { ZeroToFour } from "@module/data.js";
import { ActorSheetPF2e, SheetClickActionHandlers } from "../sheet/base.js";
import { CreatureConfig } from "./config.js";
import { Language, ResourceData } from "./index.js";
/**
 * Base class for NPC and character sheets
 * @category Actor
 */
declare abstract class CreatureSheetPF2e<TActor extends CreaturePF2e> extends ActorSheetPF2e<TActor> {
    #private;
    /** A DocumentSheet class presenting additional, per-actor settings */
    protected abstract readonly actorConfigClass: ConstructorOf<CreatureConfig<CreaturePF2e>> | null;
    getData(options?: Partial<ActorSheetOptions>): Promise<CreatureSheetData<TActor>>;
    protected prepareSpellcasting(): Promise<SpellcastingSheetData[]>;
    /** Get the font-awesome icon used to display a certain level of skill proficiency */
    protected getProficiencyIcon(level: ZeroToFour): string;
    activateListeners($html: JQuery): void;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
    protected _onDropItem(event: DragEvent, data: DropCanvasItemData): Promise<ItemPF2e[]>;
    /** Adds support for moving spells between spell levels, spell collections, and spell preparation */
    protected _onSortItem(event: DragEvent, itemData: ItemSourcePF2e): Promise<ItemPF2e[]>;
    /** Handle dragging spells onto spell slots. */
    protected _handleDroppedItem(event: DragEvent, item: ItemPF2e<ActorPF2e | null>, data: DropCanvasItemData): Promise<ItemPF2e<ActorPF2e | null>[]>;
    /** Replace sheet config with a special PC config form application */
    protected _getHeaderButtons(): ApplicationV1HeaderButton[];
    /** Redirect an update to shield HP to the actual item */
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface CreatureSheetData<TActor extends CreaturePF2e> extends ActorSheetDataPF2e<TActor> {
    actorSizes: typeof CONFIG.PF2E.actorSizes;
    rarity: typeof CONFIG.PF2E.rarityTraits;
    frequencies: typeof CONFIG.PF2E.frequencies;
    pfsFactions: typeof CONFIG.PF2E.pfsFactions;
    languages: {
        slug: Language | null;
        label: string;
    }[];
    initiativeOptions: FormSelectOption[];
    dying: {
        maxed: boolean;
        remainingDying: number;
        remainingWounded: number;
    };
    specialResources: ResourceData[];
}
export { CreatureSheetPF2e, type CreatureSheetData };
