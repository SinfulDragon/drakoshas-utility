import type { ActorPF2e } from "@actor";
import type { RawItemChatData } from "@item/base/data/index.js";
import { PhysicalItemPF2e } from "@item/physical/index.js";
import { EnrichmentOptionsPF2e } from "@system/text-editor.js";
import type { EquipmentSource, EquipmentSystemData, EquipmentTrait } from "./data.js";
declare class EquipmentPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    static get validTraits(): Record<EquipmentTrait, string>;
    /** Whether the item has an attached (or affixed, applied, etc.) usage */
    get isAttachable(): boolean;
    getChatData(this: EquipmentPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptionsPF2e): Promise<RawItemChatData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
}
interface EquipmentPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: EquipmentSource;
    system: EquipmentSystemData;
    get traits(): Set<EquipmentTrait>;
}
export { EquipmentPF2e };
