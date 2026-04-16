import { ItemSourcePF2e } from "@item/base/data/index.js";
import { Migration702REFormulasAtInstanceLevel } from "./702-re-formulas-at-instance-level.js";
export declare class Migration709REFormulasAtInstanceLevelRedux extends Migration702REFormulasAtInstanceLevel {
    static version: number;
    private walkObject;
    private findAndMigrateFormulas;
    /** Migrate nested roll formulas on rule elements */
    updateItem(itemSource: ItemSourcePF2e): Promise<void>;
}
