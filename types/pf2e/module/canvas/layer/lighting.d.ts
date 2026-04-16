import { AmbientLightPF2e } from "../ambient-light.js";
export declare class LightingLayerPF2e<TAmbientLight extends AmbientLightPF2e = AmbientLightPF2e> extends fc.layers
    .LightingLayer<TAmbientLight> {
    get lightingLevel(): number;
    protected _deactivate(): void;
}
