import { SkillActionOptions } from "../index.js";
import { SingleCheckAction } from "@actor/actions/index.js";
declare function gatherInformation(options: SkillActionOptions): void;
declare const action: SingleCheckAction;
export { gatherInformation as legacy, action };
