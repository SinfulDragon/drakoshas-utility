import type { AmbientLightPF2e } from "@module/canvas/index.js";
import type { ScenePF2e } from "./index.js";
declare class AmbientLightDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends AmbientLightDocument<TParent> {
}
interface AmbientLightDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends AmbientLightDocument<TParent> {
    get object(): AmbientLightPF2e<this> | null;
}
export { AmbientLightDocumentPF2e };
