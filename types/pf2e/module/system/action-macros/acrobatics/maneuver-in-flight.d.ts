import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function maneuverInFlight(options: SkillActionOptions): Promise<void>;
declare const action: SingleCheckAction;
export { maneuverInFlight as legacy, action };
