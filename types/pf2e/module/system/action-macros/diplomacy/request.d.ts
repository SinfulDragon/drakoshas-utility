import { SkillActionOptions } from "../index.js";
import { SingleCheckAction } from "@actor/actions/index.js";
declare function request(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { request as legacy, action };
