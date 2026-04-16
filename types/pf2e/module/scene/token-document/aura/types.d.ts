import { AuraAppearanceData } from "@actor/types.js";
import { ItemTrait } from "@item/base/data/system.js";
import type { TokenPF2e } from "@module/canvas/index.js";
import type { TokenDocumentPF2e } from "../index.js";
interface TokenAuraData {
    /** The radius of the aura, measured in feet from the boundary of a token's space */
    radius: number;
    /** The token from which this aura is emanating */
    token: TokenPF2e | TokenDocumentPF2e;
    /** The rectangle defining this aura's space */
    bounds: PIXI.Rectangle;
    /** The pixel-coordinate radius of this aura, measured from the center */
    radiusPixels: number;
    appearance: AuraAppearanceData;
    /** Traits (especially "visual" and "auditory") associated with this aura */
    traits: ItemTrait[];
}
export type { TokenAuraData };
