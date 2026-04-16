import type { RegionEventType } from "@client/data/region-behaviors/base.d.mts";
import type { ModelPropsFromSchema, SetField, SourceFromSchema, StringField } from "@common/data/fields.d.mts";
import { RegionBehaviorPF2e } from "./document.js";
import { RegionEventPF2e } from "./types.js";
declare class EnvironmentBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentTypeSchema, RegionBehaviorPF2e | null> {
    events: Set<RegionEventType>;
    static defineSchema(): EnvironmentTypeSchema;
    protected _handleRegionEvent(event: RegionEventPF2e): Promise<void>;
}
interface EnvironmentBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentTypeSchema, RegionBehaviorPF2e | null>, ModelPropsFromSchema<EnvironmentTypeSchema> {
}
type EnvironmentTypeSchema = {
    environmentTypes: SetField<StringField<string, string, true>>;
    mode: StringField<"add" | "remove" | "override", "add" | "remove" | "override", true>;
};
type EnvironmentTypeData = ModelPropsFromSchema<EnvironmentTypeSchema>;
type EnvironmentTypeSource = SourceFromSchema<EnvironmentTypeSchema>;
export { EnvironmentBehaviorType };
export type { EnvironmentTypeData, EnvironmentTypeSource };
