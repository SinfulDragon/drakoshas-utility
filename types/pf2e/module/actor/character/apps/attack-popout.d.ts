import type { ApplicationV1HeaderButton } from "@client/appv1/api/application-v1.d.mts";
import type { ActorSheetOptions } from "@client/appv1/sheets/actor-sheet.d.mts";
import type { EffectTrait } from "@item/abstract-effect/types.js";
import type { CharacterAttack } from "../data.js";
import type { CharacterPF2e } from "../document.js";
import { CharacterSheetPF2e, type CharacterSheetData } from "../sheet.js";
declare class AttackPopout<TActor extends CharacterPF2e> extends CharacterSheetPF2e<TActor> {
    #private;
    type: AttackPopoutOptions["type"];
    get template(): string;
    get id(): string;
    static get defaultOptions(): ActorSheetOptions;
    get label(): string | null;
    constructor(object: TActor, options: AttackPopoutOptions);
    getData(options: ActorSheetOptions): Promise<AttackPopoutData<TActor>>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _getHeaderButtons(): ApplicationV1HeaderButton[];
}
interface BaseAttackPopoutOptions extends Partial<ActorSheetOptions> {
    type: string;
}
interface StrikePopoutOptions extends BaseAttackPopoutOptions {
    type: "strike" | "area-fire" | "auto-fire";
    slug?: string;
    itemId?: string;
}
interface BlastPopoutOptions extends BaseAttackPopoutOptions {
    type: "blast";
    elementTrait?: EffectTrait;
}
type AttackPopoutOptions = StrikePopoutOptions | BlastPopoutOptions;
interface AttackPopoutData<TActor extends CharacterPF2e> extends CharacterSheetData<TActor> {
    attack?: CharacterAttack;
    index?: number;
    popoutType: AttackPopoutOptions["type"];
}
export { AttackPopout };
