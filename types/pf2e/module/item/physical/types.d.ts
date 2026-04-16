import type { ArmorTrait } from "@item/armor/types.js";
import type { ConsumableTrait } from "@item/consumable/types.js";
import type { EquipmentTrait } from "@item/equipment/types.js";
import type { ShieldTrait } from "@item/shield/types.js";
import type { WeaponTrait } from "@item/weapon/types.js";
import type { PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES } from "./values.js";
type BaseMaterialType = "bone" | "cloth" | "glass" | "leather" | "paper" | "rope" | "steel" | "stone" | "wood";
type BaseMaterialThickness = "thin" | "standard" | "structure";
type BaseMaterial = {
    type: BaseMaterialType;
    thickness: BaseMaterialThickness;
};
type CoinDenomination = "pp" | "gp" | "sp" | "cp";
type Currency = CoinDenomination | "credits" | "upb";
type PhysicalItemTrait = ArmorTrait | ConsumableTrait | EquipmentTrait | ShieldTrait | WeaponTrait;
type PhysicalItemType = SetElement<typeof PHYSICAL_ITEM_TYPES>;
type PreciousMaterialType = SetElement<typeof PRECIOUS_MATERIAL_TYPES>;
type PreciousMaterialGrade = SetElement<typeof PRECIOUS_MATERIAL_GRADES>;
type Grade = keyof typeof CONFIG.PF2E.grades;
interface StackDefinition {
    size: number;
    lightBulk: number;
}
export type { BaseMaterial, CoinDenomination, Currency, Grade, PhysicalItemTrait, PhysicalItemType, PreciousMaterialGrade, PreciousMaterialType, StackDefinition, };
