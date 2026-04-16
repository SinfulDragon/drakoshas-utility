import type { CharacterPF2e } from "@actor";
import type { CreatureSheetData } from "@actor/creature/index.js";
import { CreatureSheetPF2e } from "@actor/creature/sheet.js";
import type { SheetClickActionHandlers } from "@actor/sheet/base.js";
import type { AbilityViewData } from "@actor/sheet/data-types.js";
import type { ActorSheetOptions } from "@client/appv1/sheets/actor-sheet.d.mts";
import type { StatisticTraceData } from "@system/statistic/index.js";
import type { FamiliarPF2e } from "./document.js";
/**
 * @category Actor
 */
export declare class FamiliarSheetPF2e<TActor extends FamiliarPF2e> extends CreatureSheetPF2e<TActor> {
    /** There is currently no actor config for familiars */
    protected readonly actorConfigClass: null;
    static get defaultOptions(): ActorSheetOptions;
    getData(options?: ActorSheetOptions): Promise<FamiliarSheetData<TActor>>;
    protected activateClickListener(html: HTMLElement): SheetClickActionHandlers;
}
interface FamiliarSheetData<TActor extends FamiliarPF2e> extends CreatureSheetData<TActor> {
    attributes: typeof CONFIG.PF2E.abilities;
    familiarAbilities: {
        value: number;
        items: AbilityViewData[];
    };
    master: CharacterPF2e | null;
    masters: CharacterPF2e[];
    size: string;
    skills: StatisticTraceData[];
}
export {};
