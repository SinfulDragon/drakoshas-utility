import { AmbientLightDocumentPF2e } from "@scene/index.js";
import { LightingLayerPF2e } from "./index.js";
declare class AmbientLightPF2e<TDocument extends AmbientLightDocumentPF2e = AmbientLightDocumentPF2e> extends fc.placeables
    .AmbientLight<TDocument> {
}
interface AmbientLightPF2e<TDocument extends AmbientLightDocumentPF2e = AmbientLightDocumentPF2e> extends fc.placeables
    .AmbientLight<TDocument> {
    get layer(): LightingLayerPF2e<this>;
}
export { AmbientLightPF2e };
