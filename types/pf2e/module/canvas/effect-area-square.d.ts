import type { AuraAppearanceData } from "@actor/types.js";
import type { GridHighlight } from "@client/canvas/containers/_module.d.mts";
import type { Point } from "@common/_types.d.mts";
/** A square (`PIXI.Rectangle`) with additional information about an effect area it's part of */
export declare class EffectAreaSquare extends PIXI.Rectangle {
    /** Whether this square is an active part of the aura or blocked (typically by a wall) */
    active: boolean;
    constructor(x: number, y: number, width?: any, height?: any, active?: boolean);
    get center(): Point;
    highlight(layer: GridHighlight, { border, highlight }: AuraAppearanceData): void;
}
