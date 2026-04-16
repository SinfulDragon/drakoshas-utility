import { ActorPF2e } from "@actor";
import { CreatureTrait } from "@actor/creature/index.js";
import { ItemPF2e } from "@item";
import { Rarity } from "@module/data.js";
import { HeritageSource, HeritageSystemData } from "./data.js";
declare class HeritagePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    static get validTraits(): Record<CreatureTrait, string>;
    get traits(): Set<CreatureTrait>;
    get rarity(): Rarity;
    get isVersatile(): boolean;
    /** Prepare a character's data derived from their heritage */
    prepareActorData(this: HeritagePF2e<ActorPF2e>): void;
    getRollOptions(prefix?: any, options?: {
        includeGranter?: boolean;
    }): string[];
}
interface HeritagePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: HeritageSource;
    system: HeritageSystemData;
}
export { HeritagePF2e };
