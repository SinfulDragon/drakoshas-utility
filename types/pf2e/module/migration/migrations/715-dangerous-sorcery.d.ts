import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
export declare class Migration715DangerousSorcery extends MigrationBase {
    static version: number;
    private dangerousSorcery;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
