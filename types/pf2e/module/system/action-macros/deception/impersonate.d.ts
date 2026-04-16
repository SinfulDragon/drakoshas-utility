import { SkillActionOptions } from "../index.js";
import { SingleCheckAction } from "@actor/actions/index.js";
declare function impersonate(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { impersonate as legacy, action };
