import type { ActorType, CharacterPF2e } from "@actor";
import { DamageDicePF2e, Modifier } from "@actor/modifiers.js";
import { WeaponPF2e } from "@item";
import { RuleElement } from "../base.js";
import { ModelPropsFromRESchema } from "../data.js";
import { BattleFormRuleSchema } from "./schema.js";
declare class BattleFormRuleElement extends RuleElement<BattleFormRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    /** The label given to modifiers of AC, skills, and strikes */
    modifierLabel: string;
    static defineSchema(): BattleFormRuleSchema;
    preCreate({ itemSource, ruleSource }: RuleElement.PreCreateParams): Promise<void>;
    /** Set temporary hit points */
    onCreate(actorUpdates: Record<string, unknown>): void;
    beforePrepareData(): void;
    afterPrepareData(): void;
    /** Remove temporary hit points */
    onDelete(actorUpdates: Record<string, unknown>): void;
    /** Disable ineligible damage adjustments (modifiers, bonuses, additional damage) */
    applyDamageExclusion(weapon: WeaponPF2e, modifiers: (DamageDicePF2e | Modifier)[]): void;
}
interface BattleFormRuleElement extends RuleElement<BattleFormRuleSchema>, ModelPropsFromRESchema<BattleFormRuleSchema> {
    get actor(): CharacterPF2e;
}
export { BattleFormRuleElement };
