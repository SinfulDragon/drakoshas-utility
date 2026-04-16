import { ChatMessagePF2e } from "@module/chat-message/index.js";
import { ActionDefaultOptions } from "@system/action-macros/index.js";
interface RestForTheNightOptions extends ActionDefaultOptions {
    skipDialog?: boolean;
}
/** A macro for the Rest for the Night quasi-action */
export declare function restForTheNight(options: RestForTheNightOptions): Promise<ChatMessagePF2e[]>;
export {};
