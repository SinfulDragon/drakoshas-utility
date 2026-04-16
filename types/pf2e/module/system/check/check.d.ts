import { ResourceData } from "@actor/creature/types.js";
import { CheckModifier } from "@actor/modifiers.js";
import type { Rolled } from "@client/dice/_module.d.mts";
import { ChatMessagePF2e } from "@module/chat-message/index.js";
import { DegreeOfSuccessString } from "../degree-of-success.js";
import { CheckRoll } from "./roll.js";
import { CheckCheckContext } from "./types.js";
interface RerollOptions {
    resource?: string;
    keep?: "new" | "higher" | "lower";
}
type CheckRollCallback = (roll: Rolled<CheckRoll>, outcome: DegreeOfSuccessString | null | undefined, message: ChatMessagePF2e, event: Event | null) => Promise<void> | void;
declare class Check {
    #private;
    /** Roll the given statistic, optionally showing the check modifier dialog if 'Shift' is held down. */
    static roll(check: CheckModifier, context?: CheckCheckContext, event?: Event | null, callback?: CheckRollCallback): Promise<Rolled<CheckRoll> | null>;
    /** Reroll a rolled check given a chat message. */
    static rerollFromMessage(message: ChatMessagePF2e, options?: RerollOptions): Promise<void>;
    /**
     * Renders the reroll, highlighting the old result if it was a critical success or failure
     * @param roll  The roll that is to be rerendered
     * @param isOld This is the old roll render, so remove damage or other buttons
     */
    static renderReroll(roll: Rolled<Roll>, { isOld, resource }: {
        isOld: boolean;
        resource?: ResourceData | null;
    }): Promise<string>;
}
export { Check };
export type { CheckRollCallback };
