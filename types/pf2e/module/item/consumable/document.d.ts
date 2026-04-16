import type { ActorPF2e } from "@actor";
import type { DatabaseUpdateCallbackOptions } from "@common/abstract/_types.d.mts";
import type { SpellPF2e } from "@item";
import { PhysicalItemPF2e } from "@item";
import { RawItemChatData } from "@item/base/data/index.js";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick.js";
import type { ValueAndMax } from "@module/data.js";
import type { EnrichmentOptionsPF2e } from "@system/text-editor.js";
import type { ConsumableSource, ConsumableSystemData } from "./data.js";
import { type ConsumableCategory, type ConsumableTrait, type OtherConsumableTag } from "./types.js";
declare class ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    /** A cached copy of embeddedSpell, lazily regenerated every data preparation cycle */
    private _embeddedSpell;
    static get validTraits(): Record<ConsumableTrait, string>;
    get otherTags(): Set<OtherConsumableTag>;
    get category(): ConsumableCategory;
    get uses(): ValueAndMax;
    get embeddedSpell(): SpellPF2e<NonNullable<TParent>> | null;
    prepareBaseData(): void;
    getChatData(this: ConsumablePF2e<ActorPF2e>, htmlOptions?: EnrichmentOptionsPF2e, rollOptions?: Record<string, unknown>): Promise<RawItemChatData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
    getRollOptions(prefix?: any, options?: {
        includeGranter?: boolean;
    }): string[];
    /** Use a consumable item, sending the result to chat */
    consume(thisMany?: number): Promise<void>;
    castEmbeddedSpell(trickMagicItemData?: TrickMagicItemEntry): Promise<void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
}
interface ConsumablePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ConsumableSource;
    system: ConsumableSystemData;
}
export { ConsumablePF2e };
