import { FeatGroup } from "@actor/character/feats/index.js";
import { Kingdom } from "@actor/party/kingdom/model.js";
import type { DatabaseDeleteCallbackOptions } from "@common/abstract/_types.d.mts";
import type { CampaignFeaturePF2e } from "@item";
import type { ItemSourcePF2e } from "@item/base/data/index.js";
import type { ItemType } from "@item/types.js";
import type { TokenDocumentPF2e } from "@scene/index.js";
import { ArmorStatistic, Statistic, StatisticDifficultyClass } from "@system/statistic/index.js";
import { ActorPF2e, ActorUpdateCallbackOptions, HitPointsSummary } from "../base.js";
import type { ArmySource, ArmySystemData } from "./data.js";
import type { ArmyStrike } from "./types.js";
declare class ArmyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    scouting: Statistic;
    maneuver: Statistic;
    morale: Statistic;
    tactics: FeatGroup<ArmyPF2e, CampaignFeaturePF2e>;
    bonusTactics: FeatGroup<ArmyPF2e, CampaignFeaturePF2e>;
    strikes: Record<string, ArmyStrike | null>;
    get allowedItemTypes(): (ItemType | "physical")[];
    get underRoutThreshold(): boolean;
    /** Gets the active kingdom. Later this should be configurable based on alliance */
    get kingdom(): Kingdom | null;
    get maxTactics(): number;
    get strongSave(): "maneuver" | "morale";
    prepareData(): void;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    usePotion(): Promise<void>;
    prepareArmyStrike(type: "melee" | "ranged"): ArmyStrike | null;
    /** Updates the army's level, scaling all attributes that are intended to scale as the army levels up */
    updateLevel(newLevel: number): Promise<this | undefined>;
    /** Prevent addition of invalid tactic types */
    checkItemValidity(source: PreCreate<ItemSourcePF2e>): boolean;
    getStatistic(slug: string): Statistic<this> | null;
    _preUpdate(changed: DeepPartial<this["_source"]>, options: ActorUpdateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
    _onDelete(options: DatabaseDeleteCallbackOptions, userId: string): void;
}
interface ArmyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: ArmySource;
    armorClass: StatisticDifficultyClass<ArmorStatistic>;
    system: ArmySystemData;
    get hitPoints(): HitPointsSummary;
}
export { ArmyPF2e };
