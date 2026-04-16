import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function steal(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, steal as legacy };
