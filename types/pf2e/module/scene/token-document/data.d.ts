import type { DocumentFlags } from "@common/data/_module.d.mts";
import type { ModelPropsFromSchema } from "@common/data/fields.d.mts";
import type { TokenSchema } from "@common/documents/token.d.mts";
import { TokenDocumentPF2e } from "./document.js";
type TokenFlagsPF2e = DocumentFlags & {};
type WithTroopFlags<T extends TokenDocumentPF2e> = T & {
    flags: {};
};
type DetectionModeEntry = ModelPropsFromSchema<TokenSchema>["detectionModes"][number];
export type { DetectionModeEntry, TokenFlagsPF2e, WithTroopFlags };
