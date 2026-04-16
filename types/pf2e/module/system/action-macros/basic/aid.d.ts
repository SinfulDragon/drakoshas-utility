import { SingleCheckAction, SingleCheckActionVariant, SingleCheckActionVariantData } from "@actor/actions/index.js";
declare class AidAction extends SingleCheckAction {
    constructor();
    protected toActionVariant(data?: SingleCheckActionVariantData): SingleCheckActionVariant;
}
declare const aid: AidAction;
export { aid };
