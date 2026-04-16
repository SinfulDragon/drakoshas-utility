import type { Rarity } from "@module/data.js";
import type { PhysicalItemPF2e } from "./document.js";
import type { PreciousMaterialGrade, PreciousMaterialType } from "./types.js";
interface MaterialGradeData {
    level: number;
    price: number;
    hardness?: number;
    maxHP?: number;
    rarity: Rarity;
}
type MaterialValuationData = Partial<Record<PreciousMaterialType | "", Record<PreciousMaterialGrade, MaterialGradeData | null>>>;
declare function getMaterialValuationData(item: PhysicalItemPF2e): MaterialGradeData | null;
declare const OBJECT_MATERIAL_VALUATION_DATA: MaterialValuationData;
declare const MATERIAL_DATA: {
    armor: Partial<Record<any, Record<SetElement<Set<"low" | "standard" | "high">>, MaterialGradeData | null>>>;
    object: Partial<Record<any, Record<SetElement<Set<"low" | "standard" | "high">>, MaterialGradeData | null>>>;
    shield: {
        shield: Partial<Record<any, Record<SetElement<Set<"low" | "standard" | "high">>, MaterialGradeData | null>>>;
        buckler: Partial<Record<any, Record<SetElement<Set<"low" | "standard" | "high">>, MaterialGradeData | null>>>;
        towerShield: Partial<Record<any, Record<SetElement<Set<"low" | "standard" | "high">>, MaterialGradeData | null>>>;
    };
    weapon: Partial<Record<any, Record<SetElement<Set<"low" | "standard" | "high">>, MaterialGradeData | null>>>;
};
export { MATERIAL_DATA, OBJECT_MATERIAL_VALUATION_DATA, getMaterialValuationData };
export type { MaterialGradeData, MaterialValuationData };
