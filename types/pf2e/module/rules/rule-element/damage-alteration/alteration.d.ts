import type { ActorPF2e } from "@actor";
import { DamageDicePF2e, Modifier } from "@actor/modifiers.js";
import type { ItemPF2e } from "@item";
import { BaseDamageData } from "@system/damage/types.js";
import { Predicate } from "@system/predication.js";
import type { RuleValue } from "../data.js";
import type { DamageAlterationProperty, DamageAlterationRuleElement, DamageAlterationValue } from "./rule-element.js";
declare class DamageAlteration {
    #private;
    slug: string | null;
    property: DamageAlterationProperty;
    value: RuleValue | null;
    constructor(rule: PartialRuleElement);
    getNewValue(damage: BaseDamageData | DamageDicePF2e | Modifier, item: ItemPF2e | null): DamageAlterationValue | null;
    applyTo<TDamage extends DamageDicePF2e | Modifier>(damage: TDamage, options: {
        item: ItemPF2e<ActorPF2e>;
        test: string[] | Set<string>;
    }): TDamage;
}
interface PartialRuleElement extends Pick<DamageAlterationRuleElement, "mode" | "property" | "slug" | "value"> {
    resolveValue?: DamageAlterationRuleElement["resolveValue"];
    ignored?: boolean;
    parent?: ItemPF2e<ActorPF2e>;
    predicate?: Predicate;
}
export { DamageAlteration };
