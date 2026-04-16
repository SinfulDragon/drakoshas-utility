import { ActorSourcePF2e } from "@actor/data/index.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { MigrationBase } from "../base.js";
/** Certain actor specific spell properties moved to spell.location such as signature */
export declare class Migration734SpellLocationPropsAndSignature extends MigrationBase {
    static version: number;
    updateActor(actor: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e, actor?: ActorSourcePF2e): Promise<void>;
}
