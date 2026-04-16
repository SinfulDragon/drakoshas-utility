import { CreatureConfig, CreatureConfigData } from "@actor/creature/config.js";
import type { DocumentSheetV1Options } from "@client/appv1/api/document-sheet-v1.d.mts";
import type { CharacterPF2e } from "./document.js";
export declare class CharacterConfig extends CreatureConfig<CharacterPF2e> {
    getData(options?: Partial<DocumentSheetV1Options>): Promise<PCConfigData>;
}
interface PCConfigData extends CreatureConfigData<CharacterPF2e> {
    showBasicUnarmed: boolean;
}
export {};
