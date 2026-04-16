import type { ActorPF2e } from "@actor";
import type { StrikeData } from "@actor/data/base.js";
import type { ItemPF2e } from "@item";
import type { Statistic } from "@system/statistic/statistic.js";
import { RollContext } from "./base.js";
import { CheckContextConstructorParams, CheckContextData } from "./types.js";
declare class CheckContext<TSelf extends ActorPF2e, TStatistic extends Statistic | StrikeData, TItem extends ItemPF2e<ActorPF2e> | null> extends RollContext<TSelf, TStatistic, TItem> {
    /** The slug of a `Statistic` for use in building a DC */
    against: string | null;
    constructor(params: CheckContextConstructorParams<TSelf, TStatistic, TItem>);
    resolve(): Promise<CheckContextData<TSelf, TStatistic, TItem>>;
}
export { CheckContext };
