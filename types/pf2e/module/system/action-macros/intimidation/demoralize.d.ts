import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function demoralize(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, demoralize as legacy };
