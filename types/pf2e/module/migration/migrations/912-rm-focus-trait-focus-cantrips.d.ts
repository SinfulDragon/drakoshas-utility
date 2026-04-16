import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Remove the "focus" traits from focus cantrips. */
export declare class Migration912RmFocusTraitFocusCantrips extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
