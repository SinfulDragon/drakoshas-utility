import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function avoidNotice(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, avoidNotice as legacy };
