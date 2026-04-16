import type { ActorPF2e } from "@actor";
import type { WeaponPF2e } from "@item";
import { ModularConfig } from "@item/base/data/system.js";
import type { DamageType } from "@system/damage/types.js";
/** A helper class to handle toggleable weapon traits */
declare class WeaponTraitToggles {
    #private;
    parent: WeaponPF2e;
    constructor(weapon: WeaponPF2e);
    get actor(): ActorPF2e | null;
    get doubleBarrel(): {
        selected: boolean;
    };
    get modular(): {
        options: ModularConfig[];
        selected: number;
        config: ModularConfig;
    } | null;
    get versatile(): {
        options: DamageType[];
        selected: DamageType | null;
    };
    applyChanges(): void;
    /**
     * Update a modular or versatile weapon to change its damage type
     * @returns A promise indicating whether an update was made
     */
    update(options: ToggleWeaponTraitParams): Promise<boolean>;
}
interface ToggleDoubleBarrelParams {
    trait: "double-barrel";
    selected: boolean;
}
type ToggleModularVersatileParams = {
    trait: "modular";
    selected: number | null;
} | {
    trait: "versatile";
    selected: DamageType | null;
};
type ToggleWeaponTraitParams = ToggleDoubleBarrelParams | ToggleModularVersatileParams;
export { WeaponTraitToggles };
