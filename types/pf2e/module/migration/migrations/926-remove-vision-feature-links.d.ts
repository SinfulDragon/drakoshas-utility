import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Remove links to removed vision features to prevent broken links **/
export declare class Migration926RemoveVisionFeatureLinks extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
