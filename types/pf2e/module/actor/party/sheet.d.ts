import { ActorPF2e } from "@actor";
import type { HitPointsSummary } from "@actor/base.js";
import type { ResourceData } from "@actor/creature/index.js";
import { ActorSheetPF2e } from "@actor/sheet/base.js";
import type { ActorSheetDataPF2e, ActorSheetRenderOptionsPF2e } from "@actor/sheet/data-types.js";
import type { ActorSheetOptions } from "@client/appv1/sheets/actor-sheet.d.mts";
import type { DropCanvasData } from "@client/helpers/hooks.d.mts";
import { ItemPF2e } from "@item";
import type { ItemSourcePF2e } from "@item/base/data/index.js";
import { Bulk } from "@item/physical/index.js";
import type { DropCanvasItemData } from "@module/canvas/drop-canvas-data.js";
import type { ZeroToFour } from "@module/data.js";
import { SheetOptions } from "@module/sheet/helpers.js";
import { PartyPF2e } from "./document.js";
import appv1 = foundry.appv1;
interface PartySheetRenderOptions extends ActorSheetRenderOptionsPF2e {
    actors?: boolean;
}
declare class PartySheetPF2e extends ActorSheetPF2e<PartyPF2e> {
    #private;
    currentSummaryView: string;
    static get defaultOptions(): ActorSheetOptions;
    regionTemplates: Record<string, string>;
    protected _getHeaderButtons(): appv1.api.ApplicationV1HeaderButton[];
    getData(options?: ActorSheetOptions): Promise<PartySheetData>;
    protected setSummaryView(view: string): void;
    activateListeners($html: JQuery<HTMLElement>): void;
    /** Overriden to prevent inclusion of campaign-only item types. Those should get added to their own sheet */
    protected _onDropItemCreate(itemData: ItemSourcePF2e | ItemSourcePF2e[]): Promise<Item<PartyPF2e>[]>;
    /** Override to allow divvying/outward transfer of items via party member blocks in inventory members sidebar. */
    protected _onDropItem(event: DragEvent, data: DropCanvasItemData & {
        fromInventory?: boolean;
    }): Promise<ItemPF2e[]>;
    /** Override to not auto-disable fields on a thing meant to be used by players */
    protected _disableFields(_form: HTMLElement): void;
    render(force?: boolean, options?: PartySheetRenderOptions): this;
    protected _renderInner(data: Record<string, unknown>, options: appv1.api.AppV1RenderOptions): Promise<JQuery<HTMLElement>>;
    protected _onDropActor(event: DragEvent, data: DropCanvasData<"Actor", PartyPF2e>): Promise<false | void>;
}
interface PartySheetData extends ActorSheetDataPF2e<PartyPF2e> {
    /** Is the sheet restricted to players? */
    playerRestricted: boolean;
    /** Is the sheet restricted to the current user? */
    restricted: boolean;
    members: MemberBreakdown[];
    overviewSummary: {
        languages: LanguageSheetData[];
        skills: SkillData[];
        knowledge: {
            regular: SkillData[];
            lore: SkillData[];
        };
    } | null;
    inventorySummary: {
        totalCurrency: string;
        totalWealth: string;
        totalBulk: Bulk;
    };
    explorationSummary: {
        speed: number;
        feetPerMinute: number;
        milesPerHour: number;
        milesPerDay: number;
        activities: number;
    };
    /** Unsupported items on the sheet, may occur due to disabled campaign data */
    orphaned: ItemPF2e[];
}
interface SkillData {
    slug: string;
    label: string;
    mod: number;
    rank?: ZeroToFour | null;
}
interface MemberBreakdown {
    actor: ActorPF2e;
    genderPronouns: string | null;
    blurb: string | null;
    resource: ResourceData | null;
    hasBulk: boolean;
    bestSkills: SkillData[];
    /** If the actor is owned by the current user */
    owner: boolean;
    /** If the actor has observer or greater permission */
    observer: boolean;
    /** If the actor has limited or greater permission */
    limited: boolean;
    speeds: {
        label: string;
        value: number;
    }[];
    senses: {
        label: string | null;
        labelFull: string;
        acuity?: string;
    }[];
    hp: HitPointsSummary;
    activities: {
        uuid: string;
        name: string;
        img: string;
        traits: SheetOptions;
    }[];
    currency: string;
    wealth: string;
    /** If true, the current user is restricted from seeing meta details */
    restricted: boolean;
}
interface LanguageSheetData {
    slug: string;
    label: string;
    actors: ActorPF2e[];
}
export { PartySheetPF2e, type PartySheetRenderOptions };
