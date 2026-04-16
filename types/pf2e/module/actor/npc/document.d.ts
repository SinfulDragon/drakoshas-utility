import { CreaturePF2e } from "@actor";
import type { ActorUpdateCallbackOptions, ActorUpdateOperation } from "@actor/base.js";
import type { Abilities } from "@actor/creature/data.js";
import type { CreatureUpdateCallbackOptions } from "@actor/creature/index.js";
import { ActorInitiative } from "@actor/initiative.js";
import type { UserAction } from "@common/constants.d.mts";
import type { MeleePF2e } from "@item";
import type { ItemType } from "@item/types.js";
import { RollNotePF2e } from "@module/notes.js";
import { CreatureIdentificationData } from "@module/recall-knowledge.js";
import type { TokenDocumentPF2e } from "@scene";
import type { NPCFlags, NPCSource, NPCSystemData } from "./data.js";
import type { VariantCloneParams } from "./types.js";
declare class NPCPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    #private;
    initiative: ActorInitiative;
    /** If this is a troop, contains the actors of the other troop segments in the current scene */
    otherSegments: NPCPF2e[] | null;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** The level of this creature without elite/weak adjustments */
    get baseLevel(): number;
    /** This NPC's attribute modifiers */
    get abilities(): Abilities;
    get description(): string;
    /** Does this NPC have the Elite adjustment? */
    get isElite(): boolean;
    /** Does this NPC have the Weak adjustment? */
    get isWeak(): boolean;
    get identificationDCs(): CreatureIdentificationData;
    /** A user can see an unlinked NPC in the actor directory only if they have at least Observer permission */
    get visible(): boolean;
    /** Non-owning users may be able to loot a dead NPC. */
    canUserModify(user: fd.BaseUser, action: UserAction): boolean;
    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    prepareBaseData(): void;
    prepareDerivedData(): void;
    private prepareSaves;
    private prepareSkills;
    getAttackEffects(attack: MeleePF2e): Promise<RollNotePF2e[]>;
    private getHpAdjustment;
    /** Make the NPC elite, weak, or normal */
    applyAdjustment(adjustment: "elite" | "weak" | null): Promise<void>;
    /** Create a variant clone of this NPC, adjusting any of name, description, and images */
    variantClone(params: VariantCloneParams & {
        save?: false;
    }): this;
    variantClone(params: VariantCloneParams & {
        save: true;
    }): Promise<this>;
    variantClone(params: VariantCloneParams): this | Promise<this>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: CreatureUpdateCallbackOptions & {
        fromTroop?: boolean;
    }, user: fd.BaseUser): Promise<boolean | void>;
    _onUpdate(changed: DeepPartial<this["_source"]>, options: ActorUpdateCallbackOptions, userId: string): void;
    protected _onEmbeddedDocumentChange(): void;
}
interface NPCPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends CreaturePF2e<TParent> {
    flags: NPCFlags;
    readonly _source: NPCSource;
    system: NPCSystemData;
    update(data: Record<string, unknown>, operation?: Partial<ActorUpdateOperation<TParent>> & {
        fromTroop?: boolean;
    }): Promise<this | undefined>;
}
export { NPCPF2e };
