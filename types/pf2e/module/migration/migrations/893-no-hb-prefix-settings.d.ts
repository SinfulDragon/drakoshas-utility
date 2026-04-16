import { MigrationBase } from "../base.js";
/** Remove "hb_" prefixes from homebrew element slugs. */
export declare class Migration893NoHBPrefixSettings extends MigrationBase {
    static version: number;
    migrate(): Promise<void>;
}
