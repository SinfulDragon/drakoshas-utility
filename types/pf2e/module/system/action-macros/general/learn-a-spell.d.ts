import { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "@actor/actions/index.js";
declare class LearnASpellAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
declare const learnASpell: LearnASpellAction;
export { learnASpell };
