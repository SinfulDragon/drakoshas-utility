import { CustomDamageData } from "./data.js";
/**
 * To update all custom damage types in the system, we need to ensure that all collections are added to and cleaned.
 * This reduces the scope of all damage related operations so that its easier to identify when something goes wrong.
 */
export declare class DamageTypeManager {
    collections: {
        physicalConfig: Record<string, string>;
        energyConfig: Record<string, string>;
        physical: string[];
        energy: string[];
        DAMAGE_TYPES: Set<"poison" | "mental" | "sonic" | "acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "piercing" | "slashing" | "spirit" | "vitality" | "void" | "untyped">;
        BASE_DAMAGE_TYPES_TO_CATEGORIES: Record<SetElement<Set<"poison" | "mental" | "sonic" | "acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "piercing" | "slashing" | "spirit" | "vitality" | "void" | "untyped">>, string | number | symbol | null>;
        DAMAGE_TYPE_ICONS: Record<SetElement<Set<"poison" | "mental" | "sonic" | "acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "piercing" | "slashing" | "spirit" | "vitality" | "void" | "untyped">>, string | null>;
        damageTypesLocalization: Record<SetElement<Set<"poison" | "mental" | "sonic" | "acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "piercing" | "slashing" | "spirit" | "vitality" | "void" | "untyped">>, string>;
        damageRollFlavorsLocalization: Record<SetElement<Set<"poison" | "mental" | "sonic" | "acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "piercing" | "slashing" | "spirit" | "vitality" | "void" | "untyped">>, string>;
        immunityTypes: Record<string, string>;
        weaknessTypes: Record<string, string>;
        resistanceTypes: Record<string, string>;
    };
    addCustomDamage(data: CustomDamageData, options?: {
        slug?: string;
    }): void;
    updateSettings(): void;
}
