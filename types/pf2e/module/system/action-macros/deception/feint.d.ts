import { SkillActionOptions } from "../index.js";
import { SingleCheckAction } from "@actor/actions/index.js";
declare function feint(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { feint as legacy, action };
