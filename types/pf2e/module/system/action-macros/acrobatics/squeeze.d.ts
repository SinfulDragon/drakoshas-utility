import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function squeeze(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { squeeze as legacy, action };
