import { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "@actor/actions/index.js";
declare class IdentifyMagicAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
declare const identifyMagic: IdentifyMagicAction;
export { identifyMagic };
