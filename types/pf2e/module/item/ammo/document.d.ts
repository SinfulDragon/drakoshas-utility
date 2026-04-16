import { ActorPF2e } from "@actor";
import type { RawItemChatData } from "@item/base/data/index.js";
import type { ConsumableTrait } from "@item/consumable/types.js";
import { PhysicalItemPF2e } from "@item/physical/index.js";
import type { WeaponPF2e } from "@item/weapon/document.js";
import type { ValueAndMax } from "@module/data.js";
import type { EnrichmentOptionsPF2e } from "@system/text-editor.js";
import { AmmoSource, AmmoSystemData } from "./data.js";
declare class AmmoPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<ConsumableTrait, string>;
    get isMagazine(): boolean;
    get uses(): ValueAndMax;
    prepareBaseData(): void;
    isAmmoFor(weapon: WeaponPF2e): boolean;
    /** Use a consumable item, sending the result to chat */
    consume(thisMany?: number): Promise<void>;
    getChatData(htmlOptions?: EnrichmentOptionsPF2e): Promise<RawItemChatData>;
    protected _preCreate(data: DeepPartial<this["_source"]>, options: foundry.abstract.DatabaseCreateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: foundry.abstract.DatabaseUpdateCallbackOptions & {
        checkHP?: boolean;
    }, user: fd.BaseUser): Promise<boolean | void>;
}
interface AmmoPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: AmmoSource;
    system: AmmoSystemData;
}
export { AmmoPF2e };
