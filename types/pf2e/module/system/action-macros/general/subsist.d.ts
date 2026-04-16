import { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "@actor/actions/index.js";
import { SkillActionOptions } from "../index.js";
declare function subsist(options: SkillActionOptions): void;
declare class SubsistAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
declare const action: SubsistAction;
export { action, subsist as legacy };
