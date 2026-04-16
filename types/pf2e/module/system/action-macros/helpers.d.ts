import type { ActorPF2e } from "@actor";
import { Modifier } from "@actor/modifiers.js";
import type { ItemPF2e, WeaponPF2e } from "@item";
import type { WeaponTrait } from "@item/weapon/types.js";
import { RollNotePF2e } from "@module/notes.js";
import type { TokenDocumentPF2e } from "@scene";
import { CheckType } from "@system/check/index.js";
import type { DegreeOfSuccessString } from "@system/degree-of-success.js";
import type { CheckContextData, CheckContextOptions, CheckMacroContext, SimpleRollActionCheckOptions } from "./types.js";
declare class ActionMacroHelpers {
    #private;
    static resolveStat(stat: string, actor: ActorPF2e): {
        checkType: CheckType;
        property: string;
        stat: string;
        subtitle: string;
    };
    static defaultCheckContext<ItemType extends ItemPF2e<ActorPF2e>>(options: CheckContextOptions<ItemType>, data: CheckContextData<ItemType>): CheckMacroContext<ItemType> | undefined;
    static note(selector: string, translationPrefix: string, outcome: DegreeOfSuccessString, translationKey?: string): RollNotePF2e;
    static outcomesNote(selector: string, translationKey: string, outcomes: DegreeOfSuccessString[]): RollNotePF2e;
    static simpleRollActionCheck<TItem extends ItemPF2e<ActorPF2e>>(options: SimpleRollActionCheckOptions<TItem>): Promise<void>;
    static target(): {
        token: TokenDocumentPF2e | null;
        actor: ActorPF2e | null;
    };
    static getWeaponPotencyModifier(item: WeaponPF2e<ActorPF2e>, selector: string): Modifier | null;
    static getBestEquippedItemForAction(actor: ActorPF2e, traits: WeaponTrait[], selector: string): WeaponPF2e<ActorPF2e> | null;
    /** Attempts to get the label for the given statistic using a slug */
    static getSimpleCheckLabel(slug: string): string | null;
}
declare class CheckContextError extends Error {
    actor: ActorPF2e;
    slug: string;
    constructor(message: string, actor: ActorPF2e, slug: string);
}
export { ActionMacroHelpers, CheckContextError };
