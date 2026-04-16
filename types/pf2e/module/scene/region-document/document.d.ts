import type EmbeddedCollection from "@common/abstract/embedded-collection.d.mts";
import type { RegionPF2e } from "@module/canvas/region.js";
import type { ScenePF2e } from "@scene";
import type { SpecificRegionBehavior } from "@scene/region-behavior/types.js";
declare class RegionDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends RegionDocument<TParent> {
    /** Set an informal top-left coordinate pair from the coordinates minima of all embedded shapes. */
    get x(): number;
    get y(): number;
    set x(value: number);
    set y(value: number);
}
interface RegionDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends RegionDocument<TParent> {
    readonly behaviors: EmbeddedCollection<SpecificRegionBehavior<this>>;
    get object(): RegionPF2e<this>;
}
export { RegionDocumentPF2e };
