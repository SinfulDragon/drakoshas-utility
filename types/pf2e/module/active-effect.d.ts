import type { ActorPF2e } from "@actor";
import type { DatabaseCreateCallbackOptions } from "@common/abstract/_types.d.mts";
import type { AbstractEffectPF2e, ItemPF2e } from "@item";
export declare class ActiveEffectPF2e<TParent extends ActorPF2e | ItemPF2e | null> extends ActiveEffect<TParent> {
    /** Create an active effect from an (abstract) effect for use in token effect icons */
    static fromEffect<TItem extends ItemPF2e<ActorPF2e>>(effect: AbstractEffectPF2e<ActorPF2e>): ActiveEffectPF2e<TItem>;
    /** Only allow the death overlay effect */
    protected _preCreate(data: DeepPartial<this["_source"]>, options: DatabaseCreateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
}
