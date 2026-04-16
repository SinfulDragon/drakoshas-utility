import { ActorPF2e } from "@actor";
import { DamageDicePF2e, Modifier } from "@actor/modifiers.js";
import type { MeleePF2e, WeaponPF2e } from "@item";
import type { NPCAttackDamage } from "@item/melee/data.js";
import type { WeaponDamage } from "@item/weapon/data.js";
import { DamageCategoryUnique, DamageDamageContext, WeaponDamageTemplate } from "./types.js";
declare class WeaponDamagePF2e {
    #private;
    static fromNPCAttack({ attack, actor, context, }: NPCStrikeCalculateParams): Promise<WeaponDamageTemplate | null>;
    /** Calculates the damage a weapon will deal when striking. Performs side effects, so make sure to pass a clone */
    static calculate({ weapon, actor, damageDice, modifiers, weaponPotency, context, }: WeaponDamageCalculateParams): Promise<WeaponDamageTemplate | null>;
    /** Parse damage formulas from melee items and construct `WeaponDamage` objects out of them */
    static npcDamageToWeaponDamage(instance: NPCAttackDamage): ConvertedNPCDamage;
}
interface ConvertedNPCDamage extends WeaponDamage {
    category: DamageCategoryUnique | null;
}
interface WeaponDamageCalculateParams {
    weapon: WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>;
    actor: ActorPF2e;
    weaponPotency?: number;
    damageDice?: DamageDicePF2e[];
    modifiers?: Modifier[];
    context: DamageDamageContext;
}
interface NPCStrikeCalculateParams {
    attack: MeleePF2e<ActorPF2e>;
    actor: ActorPF2e;
    context: DamageDamageContext;
}
export { WeaponDamagePF2e, type ConvertedNPCDamage };
