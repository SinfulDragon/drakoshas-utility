import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function pickALock(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, pickALock as legacy };
