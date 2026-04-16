import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function treatDisease(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, treatDisease as legacy };
