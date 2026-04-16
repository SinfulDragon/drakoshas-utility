import { ActorPF2e } from "@actor";
import type { ContainerPF2e, PhysicalItemPF2e } from "@item";
import type { ArmorSource, PhysicalItemSource, ShieldSource, WeaponSource } from "@item/base/data/index.js";
import type { ContainerBulkData } from "@item/container/data.js";
import { Rarity } from "@module/data.js";
import { Coins } from "./coins.js";
import { BulkData, EquippedData } from "./data.js";
declare function computeLevelRarityPrice(item: PhysicalItemPF2e): {
    level: number;
    rarity: Rarity;
    price: Coins;
};
/**
 * Checks if a change in item data leads to the item converting to sf2e (tech or analog) or pf2e (archaic) mechanics.
 * If so, it prompts for confirmation, allows the user to cancel, and returns the result.
 * This is checked during document _preUpdate to determine if data should be cleaned.
 * @returns pf2e or sf2e based on the new traits, or `null` if no change is to be made.
 * @throws an error if the user does not make a selection
 */
declare function checkPhysicalItemSystemChange(item: PhysicalItemPF2e, changed: DeepPartial<WeaponSource | ArmorSource | ShieldSource>): Promise<"pf2e" | "sf2e" | null>;
/**
 * Generate a modified item name based on precious materials and runes. Currently only armor and weapon documents
 * have significant implementations.
 */
declare function generateItemName(item: PhysicalItemPF2e): string;
/** Validate HP changes to a physical item and also adjust current HP when max HP changes */
declare function handleHPChange(item: PhysicalItemPF2e, changed: DeepPartial<PhysicalItemSource>): void;
/** Add and adjust properties on an item's bulk data object */
declare function prepareBulkData<TItem extends PhysicalItemPF2e>(item: TItem): TItem extends ContainerPF2e ? ContainerBulkData : BulkData;
/** Clone an item, sizing it appropriately for the actor. For larger PCs, set the price's sensitity to false.  */
declare function sizeItemForActor<TItem extends PhysicalItemPF2e>(item: TItem, actor: ActorPF2e): TItem;
/** Returns the default equip status for this item, called in order to "reset" the equip status */
declare function getDefaultEquipStatus(item: PhysicalItemPF2e): EquippedData;
/**
 * Transfers credits between actors. This is separated to avoid making it callable API during the first few versions.
 * This does not transfer the entire credstick, that's handled by other calling functions.
 * @todo if we're keeping a separate transferCredits() function longterm, find a home
 */
declare function transferCredits({ item, targetActor, quantity, }: {
    item: PhysicalItemPF2e;
    targetActor: ActorPF2e;
    quantity: number;
}): Promise<void>;
export { Coins, checkPhysicalItemSystemChange, computeLevelRarityPrice, generateItemName, getDefaultEquipStatus, handleHPChange, prepareBulkData, sizeItemForActor, transferCredits, };
