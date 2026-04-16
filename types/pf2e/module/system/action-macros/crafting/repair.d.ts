import { PhysicalItemPF2e } from "@item";
import { ChatMessagePF2e } from "@module/chat-message/index.js";
import { CheckDC } from "@system/degree-of-success.js";
import { SkillActionOptions } from "../types.js";
declare function repair(options: RepairActionOptions): Promise<void>;
declare function onRepairChatCardEvent(event: PointerEvent, message: ChatMessagePF2e | undefined, card: HTMLElement): Promise<void>;
interface RepairActionOptions extends SkillActionOptions {
    difficultyClass?: CheckDC;
    item?: PhysicalItemPF2e;
    uuid?: string;
}
export { onRepairChatCardEvent, repair };
