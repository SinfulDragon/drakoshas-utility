import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/**  Flatten several numeric value object properties into numbers */
export declare class Migration848NumericArmorProperties extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemMaybeWithOldProperty): Promise<void>;
}
type ItemMaybeWithOldProperty = ItemSourcePF2e & {
    system: {
        armor?: unknown;
        "-=armor"?: unknown;
        dex?: unknown;
        "-=dex"?: unknown;
        check?: unknown;
        "-=check"?: unknown;
        speed?: unknown;
        "-=speed"?: unknown;
    };
};
export {};
