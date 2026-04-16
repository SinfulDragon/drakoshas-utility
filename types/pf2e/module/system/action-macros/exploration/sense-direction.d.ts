import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function senseDirection(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, senseDirection as legacy };
