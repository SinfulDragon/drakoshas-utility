import { CreaturePF2e, type CharacterPF2e } from "@actor";
import type { CreatureUpdateCallbackOptions } from "@actor/creature/index.js";
import type { DatabaseDeleteCallbackOptions } from "@common/abstract/_types.d.mts";
import type { ActorUUID } from "@common/documents/_module.d.mts";
import type { ItemType } from "@item/types.js";
import type { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.js";
import type { RuleElement } from "@module/rules/index.js";
import type { TokenDocumentPF2e } from "@scene";
import { Statistic } from "@system/statistic/index.js";
import type { FamiliarSource, FamiliarSystemData } from "./data.js";
declare class FamiliarPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    /** The familiar's attack statistic, for the rare occasion it must make an attack roll */
    attackStatistic: Statistic;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The familiar's master, if selected */
    get master(): CharacterPF2e | null;
    /** Returns attribute modifier value from the master, or 0 if no attribute */
    get masterAttributeModifier(): number;
    /** @deprecated for internal use but not rule elements referencing it until a migration is in place. */
    get masterAbilityModifier(): number;
    get combatant(): CombatantPF2e<EncounterPF2e> | null;
    /** Re-render the sheet if data preparation is called from the familiar's master */
    reset({ fromMaster }?: {
        fromMaster?: boolean | undefined;
    }): void;
    /** Set base emphemeral data for later updating by derived-data preparation. */
    prepareBaseData(): void;
    /** Skip rule-element preparation if there is no master */
    protected prepareRuleElements(): RuleElement[];
    prepareDerivedData(): void;
    /** Detect if a familiar is being reassigned from a master */
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: CreatureUpdateCallbackOptions & {
        previousMaster?: ActorUUID;
    }, user: fd.BaseUser): Promise<boolean | void>;
    /** Remove familiar from former master if the master changed */
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: CreatureUpdateCallbackOptions & {
        previousMaster?: ActorUUID;
    }, userId: string): void;
    /** Remove the master's reference to this familiar */
    protected _onDelete(options: DatabaseDeleteCallbackOptions, userId: string): void;
}
interface FamiliarPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    readonly _source: FamiliarSource;
    system: FamiliarSystemData;
}
export { FamiliarPF2e };
