import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
declare const AMMO_STACK_GROUPS: Set<"arrows" | "bolts" | "rounds10" | "blowgunDarts" | "rounds5" | "slingBullets" | "sprayPellets" | "woodenTaws">;
/** Limit `stackGroup` property to consumables and treasure */
export declare class Migration906LimitStackGroup extends MigrationBase {
    static version: number;
    updateItem(source: MaybeWithToBeDeletedStackGroup): Promise<void>;
}
type MaybeWithToBeDeletedStackGroup = ItemSourcePF2e & {
    system: {
        stackGroup?: SetElement<typeof AMMO_STACK_GROUPS> | "coins" | "gems" | null;
        "-=stackGroup"?: null;
    };
};
export {};
