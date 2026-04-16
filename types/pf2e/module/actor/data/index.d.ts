import type { ArmySource } from "@actor/army/data.js";
import type { CharacterSource } from "@actor/character/data.js";
import type { FamiliarSource } from "@actor/familiar/data.js";
import type { HazardSource } from "@actor/hazard/data.js";
import type { LootSource } from "@actor/loot/data.js";
import type { NPCSource } from "@actor/npc/data.js";
import type { PartySource } from "@actor/party/data.js";
import type { VehicleSource } from "@actor/vehicle/data.js";
import type { RollInitiativeOptions } from "@client/documents/combat.d.mts";
import type { StatisticRollParameters } from "@system/statistic/index.js";
type CreatureSource = CharacterSource | NPCSource | FamiliarSource;
type ActorSourcePF2e = ArmySource | CreatureSource | HazardSource | LootSource | PartySource | VehicleSource;
interface RollInitiativeOptionsPF2e extends RollInitiativeOptions, StatisticRollParameters {
    secret?: boolean;
}
export type { ActorSourcePF2e, ArmySource, CharacterSource, CreatureSource, FamiliarSource, HazardSource, LootSource, NPCSource, PartySource, RollInitiativeOptionsPF2e, VehicleSource, };
