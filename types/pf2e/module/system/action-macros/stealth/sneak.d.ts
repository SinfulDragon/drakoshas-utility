import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function sneak(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, sneak as legacy };
