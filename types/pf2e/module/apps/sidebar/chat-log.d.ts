import type { ApplicationRenderContext, ApplicationRenderOptions } from "@client/applications/_types.d.mts";
import type ChatPopout from "@client/applications/sidebar/apps/chat-popout.d.mts";
import type { ContextMenuEntry } from "@client/applications/ux/context-menu.d.mts";
import type { ChatSpeakerData } from "@common/documents/chat-message.d.mts";
import { ChatMessagePF2e } from "@module/chat-message/index.js";
declare class ChatLogPF2e extends fa.sidebar.tabs.ChatLog {
    #private;
    static DEFAULT_OPTIONS: {
        actions: {
            activate: Function;
            applyDamage: Function;
            applyEffect: Function;
            findToken: Function;
            kingdomCollect: Function;
            revertDamage: Function;
            recoverPersistentDamage: Function;
            setAsInitiative: Function;
            shieldBlock: Function;
        };
    };
    _onRender(context: ApplicationRenderContext, options: fa.api.HandlebarsRenderOptions): Promise<void>;
    /** Replace parent method in order to use DamageRoll class as needed */
    processMessage(message: string, options?: {
        speaker?: ChatSpeakerData;
    }): Promise<ChatMessagePF2e | undefined>;
    static onRenderChatPopout(popout: ChatPopout, options: ApplicationRenderOptions): Promise<void>;
    protected _getEntryContextOptions(): ContextMenuEntry[];
}
export { ChatLogPF2e };
