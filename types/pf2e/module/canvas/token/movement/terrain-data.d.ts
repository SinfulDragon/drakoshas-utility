import type { TokenMeasureMovementPathOptions } from "@client/_types.d.mts";
import type { TokenMovementCostFunction } from "@client/documents/_types.d.mts";
import type { TokenDocumentPF2e } from "@scene";
export declare class TerrainDataPF2e extends foundry.data.TerrainData {
    #private;
    /** Make terrain difficulty additive instead of multiplicative. */
    static getMovementCostFunction(token: TokenDocumentPF2e, options?: TokenMeasureMovementPathOptions): TokenMovementCostFunction;
}
