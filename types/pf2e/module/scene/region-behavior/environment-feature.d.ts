import { ZeroToTwo } from "@module/data.js";
import { RegionBehaviorPF2e } from "./document.js";
import fields = foundry.data.fields;
declare class EnvironmentFeatureBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentFeatureTypeSchema, RegionBehaviorPF2e | null> {
    static defineSchema(): EnvironmentFeatureTypeSchema;
}
interface EnvironmentFeatureBehaviorType extends foundry.data.regionBehaviors.RegionBehaviorType<EnvironmentFeatureTypeSchema, RegionBehaviorPF2e | null>, fields.ModelPropsFromSchema<EnvironmentFeatureTypeSchema> {
}
type EnvironmentFeatureTypeSchema = {
    terrain: fields.SchemaField<{
        difficult: fields.NumberField<ZeroToTwo, ZeroToTwo, true, false, true>;
    }>;
};
export { EnvironmentFeatureBehaviorType };
