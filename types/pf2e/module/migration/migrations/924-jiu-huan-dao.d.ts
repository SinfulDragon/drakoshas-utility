import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Rename all instances of and references to "Nine-Ring Sword" to "Jiu Huan Doa". **/
export declare class Migration924JiuHuanDoa extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
