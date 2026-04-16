import type { MacroSource } from "@common/documents/_module.d.mts";
import { MigrationBase } from "../base.js";
/** Migrate rollActionMacro function parameters to an object */
export declare class Migration871MigrateRollActionMacroParams extends MigrationBase {
    static version: number;
    updateMacro(source: MacroSource): Promise<void>;
}
