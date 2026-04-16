import type { ActorPF2e } from "@actor";
import type { TraitViewData } from "@actor/data/base.js";
import type { ImageFilePath } from "@common/constants.d.mts";
import { type PhysicalItemPF2e } from "@item";
import type { EffectSource } from "@item/effect/data.js";
import type { EffectSpinoffRuleElement } from "./rule-element.js";
declare class EffectSpinoff {
    item: PhysicalItemPF2e<ActorPF2e>;
    slug: string;
    label: string;
    img: ImageFilePath;
    activation: SpinoffActivationData | null;
    description: {
        value: string;
        markdown: boolean;
    };
    constructor(rule: EffectSpinoffRuleElement);
    createEffect(): EffectSource;
}
interface SpinoffActivationData {
    label: string | null;
    glyph: string;
    traits: TraitViewData[];
    details: string | null;
}
export { EffectSpinoff };
