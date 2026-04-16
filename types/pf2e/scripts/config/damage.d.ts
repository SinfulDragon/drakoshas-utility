import { DamageCategoryUnique, DamageType } from "@system/damage/types.js";
import { energyDamageTypes } from "./traits.js";
declare const damageCategoriesUnique: Record<DamageCategoryUnique, string>;
declare const materialDamageEffects: any;
declare const damageCategories: any;
declare const physicalDamageTypes: {
    bleed: string;
    bludgeoning: string;
    piercing: string;
    slashing: string;
};
declare const damageTypes: Record<DamageType, string>;
declare const damageRollFlavors: Record<SetElement<Set<"poison" | "mental" | "sonic" | "acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "piercing" | "slashing" | "spirit" | "vitality" | "void" | "untyped">>, string>;
export { damageCategories, damageCategoriesUnique, damageRollFlavors, damageTypes, energyDamageTypes, materialDamageEffects, physicalDamageTypes, };
