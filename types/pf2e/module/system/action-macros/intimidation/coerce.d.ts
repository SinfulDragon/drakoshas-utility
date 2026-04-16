import { SkillActionOptions } from "../index.js";
import { SingleCheckAction } from "@actor/actions/index.js";
declare function coerce(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { coerce as legacy, action };
