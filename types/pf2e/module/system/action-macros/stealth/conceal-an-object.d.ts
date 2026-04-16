import { SingleCheckAction } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function concealAnObject(options: SkillActionOptions): Promise<void>;
declare const action: SingleCheckAction;
export { action, concealAnObject as legacy };
