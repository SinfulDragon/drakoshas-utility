import type { ActorPF2e } from "@actor";
import type { ActorSourcePF2e } from "@actor/data/index.js";
import { MigrationBase } from "../base.js";
export declare class Migration866LinkToActorSizeAgain extends MigrationBase {
    static version: number;
    updateActor(actorSource: ActorSourcePF2e): Promise<void>;
    updateToken(tokenSource: foundry.documents.TokenSource, actor: ActorPF2e | null): Promise<void>;
}
