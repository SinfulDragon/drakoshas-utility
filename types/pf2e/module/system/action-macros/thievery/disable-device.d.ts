import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function disableDevice(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { action, disableDevice as legacy };
