import { ActorPF2e } from "@actor/base.js";
/** A reset batcher that attempts to avoid duplicate resets in situations with possibly multiple overlapping resets */
export declare class ResetBatch {
    #private;
    /** Adds the actor to the reset batch and makes a sync request */
    reset(actor: ActorPF2e): void;
}
