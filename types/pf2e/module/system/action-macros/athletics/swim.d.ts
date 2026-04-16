import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function swim(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, swim as legacy };
