import type { CONDITION_SLUGS } from "./values.js";
type ConditionSlug = SetElement<typeof CONDITION_SLUGS>;
type DetectionConditionType = Extract<ConditionSlug, "hidden" | "observed" | "undetected" | "unnoticed">;
type ConditionKey = ConditionSlug | `persistent-damage-${string}`;
export type { DetectionConditionType, ConditionSlug, ConditionKey };
