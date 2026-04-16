import type { DocumentFlags } from "@common/data/_types.d.mts";
import { ZeroToTwo } from "@module/data.js";
type SceneFlagsPF2e = DocumentFlags & {};
declare enum LightLevels {
    DARKNESS = 0.25,
    BRIGHT_LIGHT = 0.75
}
type LightLevel = ZeroToTwo;
type EnvironmentType = keyof typeof CONFIG.PF2E.environmentTypes;
export { LightLevels };
export type { EnvironmentType, LightLevel, SceneFlagsPF2e };
