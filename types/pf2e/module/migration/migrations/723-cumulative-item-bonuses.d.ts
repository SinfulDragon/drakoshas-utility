import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Update feats, items, and rule elements to accurately process cumulative item bonuses */
export declare class Migration723CumulativeItemBonuses extends MigrationBase {
    static version: number;
    /** Feat items: Animal Skin, Mountance Stance, Mountance Quake, and Mountance Stronghold */
    private stanceFeats;
    /** Slug pattern for the same */
    private mountainPattern;
    /** Remove old Mountain Stance effects */
    updateActor(source: ActorSourcePF2e): Promise<void>;
    /** Update feat, effect, and equipment items */
    updateItem(source: ItemSourcePF2e): Promise<void>;
    /** Replace the retired toggle macro with a simple hotbar-drop effect macro */
    updateMacro(source: foundry.documents.MacroSource): Promise<void>;
}
