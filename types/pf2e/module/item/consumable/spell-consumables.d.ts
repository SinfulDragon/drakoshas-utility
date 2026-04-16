import { ConsumablePF2e, type SpellPF2e } from "@item";
import { ConsumableSource } from "@item/base/data/index.js";
import { DCOptions } from "@module/dc.js";
declare const CANTRIP_DECK_UUID = "Compendium.pf2e.equipment-srd.Item.tLa4bewBhyqzi6Ow";
type SpellConsumableItemType = "cantripDeck5" | keyof ConfigPF2e["PF2E"]["spellcastingItems"];
declare function isSpellConsumableUUID(itemId: string): boolean;
declare function createConsumableFromSpell(spell: SpellPF2e, { type, rank, mystified, }: {
    type: string;
    rank?: number;
    mystified?: boolean;
}): Promise<ConsumableSource>;
interface TrickMagicItemDifficultyData {
    arcana?: number;
    religion?: number;
    occultism?: number;
    nature?: number;
}
declare function calculateTrickMagicItemCheckDC(item: ConsumablePF2e, options?: DCOptions): TrickMagicItemDifficultyData;
export { CANTRIP_DECK_UUID, calculateTrickMagicItemCheckDC, createConsumableFromSpell, isSpellConsumableUUID };
export type { SpellConsumableItemType, TrickMagicItemDifficultyData };
