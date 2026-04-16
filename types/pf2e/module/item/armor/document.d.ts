import type { ActorPF2e } from "@actor";
import type { DatabaseUpdateCallbackOptions } from "@common/abstract/_module.d.mts";
import type { RawItemChatData } from "@item/base/data/index.js";
import { PhysicalItemPF2e } from "@item/physical/index.js";
import type { EnrichmentOptionsPF2e } from "@system/text-editor.js";
import type { ArmorSource, ArmorSystemData } from "./data.js";
import type { ArmorCategory, ArmorGroup, ArmorTrait, BaseArmorType } from "./types.js";
declare class ArmorPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<ArmorTrait, string>;
    get isBarding(): boolean;
    get baseType(): BaseArmorType | null;
    get group(): ArmorGroup | null;
    get category(): ArmorCategory;
    get dexCap(): number;
    get strength(): number | null;
    get checkPenalty(): number;
    get speedPenalty(): number;
    get acBonus(): number;
    get isSpecific(): boolean;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: any, options?: {
        includeGranter?: boolean;
    }): string[];
    acceptsSubitem(candidate: PhysicalItemPF2e): boolean;
    isStackableWith(item: PhysicalItemPF2e<TParent>): boolean;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    prepareActorData(this: ArmorPF2e<ActorPF2e>): void;
    onPrepareSynthetics(): void;
    getChatData(this: ArmorPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptionsPF2e): Promise<RawItemChatData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    /** Ensure correct shield/actual-armor usage */
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
}
interface ArmorPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ArmorSource;
    system: ArmorSystemData;
}
export { ArmorPF2e };
