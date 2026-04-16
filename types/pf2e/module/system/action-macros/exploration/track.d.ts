import { SkillActionOptions } from "../index.js";
import { SingleCheckAction } from "@actor/actions/index.js";
declare function track(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { track as legacy, action };
