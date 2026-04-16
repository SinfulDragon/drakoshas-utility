import type { SkillSlug } from "@actor/types.js";
import type { ImageFilePath } from "@common/constants.d.mts";
import { DCOptions } from "../dc.js";
import type { PhysicalItemPF2e } from "./physical/index.js";
type MagicSkill = Extract<SkillSlug, "arcana" | "nature" | "religion" | "occultism">;
type IdentifyMagicDCs = Record<MagicSkill, number>;
type IdentifyAlchemyDCs = {
    crafting: number;
};
interface IdentifyItemOptions extends DCOptions {
    notMatchingTraditionModifier: number;
}
declare function getItemIdentificationDCs(item: PhysicalItemPF2e, { pwol, notMatchingTraditionModifier }: IdentifyItemOptions): IdentifyMagicDCs | IdentifyAlchemyDCs;
declare function getUnidentifiedPlaceholderImage(item: PhysicalItemPF2e): ImageFilePath;
export { getItemIdentificationDCs, getUnidentifiedPlaceholderImage };
export type { IdentifyAlchemyDCs, IdentifyMagicDCs };
