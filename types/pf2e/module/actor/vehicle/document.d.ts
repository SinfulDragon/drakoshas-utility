import type { ActorDimensions } from "@actor/types.js";
import type { ItemType } from "@item/types.js";
import { TokenDocumentPF2e } from "@scene/index.js";
import { ArmorStatistic, Statistic, StatisticDifficultyClass } from "@system/statistic/index.js";
import { ActorPF2e, ActorUpdateCallbackOptions, HitPointsSummary } from "../base.js";
import type { VehicleSource, VehicleSystemData } from "./data.js";
declare class VehiclePF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    armorClass: StatisticDifficultyClass<ArmorStatistic>;
    get allowedItemTypes(): (ItemType | "physical")[];
    /** Vehicle dimensions are specified for all three axes and usually do not form cubes */
    get dimensions(): ActorDimensions;
    get hardness(): number;
    /** Whether the creature emits sound: overridable by AE-like */
    get emitsSound(): boolean;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    private prepareSaves;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: ActorUpdateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
}
interface VehiclePF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: VehicleSource;
    system: VehicleSystemData;
    get hitPoints(): HitPointsSummary;
    saves: {
        fortitude: Statistic;
    };
}
export { VehiclePF2e };
