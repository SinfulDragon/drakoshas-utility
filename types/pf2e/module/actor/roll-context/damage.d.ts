import type { ActorPF2e } from "@actor";
import type { StrikeData } from "@actor/data/base.js";
import type { ItemPF2e } from "@item";
import type { Statistic } from "@system/statistic/statistic.js";
import { RollContext } from "./base.js";
import type { DamageContextConstructorParams } from "./types.js";
declare class DamageContext<TSelf extends ActorPF2e, TStatistic extends Statistic | StrikeData, TItem extends ItemPF2e<ActorPF2e> | null> extends RollContext<TSelf, TStatistic, TItem> {
    #private;
    constructor(params: DamageContextConstructorParams<TSelf, TStatistic, TItem>);
}
export { DamageContext };
