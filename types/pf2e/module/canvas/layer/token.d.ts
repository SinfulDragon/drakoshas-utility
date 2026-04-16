import type { PlaceablesLayerPointerEvent } from "@client/canvas/layers/base/placeables-layer.d.mts";
import type { Point } from "@common/_types.d.mts";
import type { TokenPF2e } from "../index.js";
declare class TokenLayerPF2e<TObject extends TokenPF2e> extends fc.layers.TokenLayer<TObject> {
    #private;
    constructor();
    /** Prevent redirection of event to `Ruler` when ctrl key is pressed. */
    protected _onClickLeft(event: PlaceablesLayerPointerEvent<TObject>): void;
    /** For troops it only warns if every segment is being deleted */
    protected _confirmDeleteKey(documents: TObject["document"][]): Promise<boolean>;
    /** Cycle Z indices of a hovered token stack. */
    cycleStack(): boolean;
    refreshDistanceLine(): void;
    refreshDistanceLine(from: TObject, to: TObject): Point;
}
export { TokenLayerPF2e };
