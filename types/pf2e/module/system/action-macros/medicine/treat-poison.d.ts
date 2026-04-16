import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function treatPoison(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, treatPoison as legacy };
