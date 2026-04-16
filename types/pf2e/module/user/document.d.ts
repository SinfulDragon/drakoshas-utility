import type { ActorPF2e } from "@actor";
import type UserTargets from "@client/canvas/placeables/tokens/targets.d.mts";
import type { DatabaseUpdateCallbackOptions } from "@common/abstract/_types.d.mts";
import type { TradeQueryData, TradeQueryResponse } from "@module/apps/trade-dialog/app.js";
import type { TokenPF2e } from "@module/canvas/index.js";
import type { ScenePF2e, TokenDocumentPF2e } from "@scene";
import type { UserFlagsPF2e, UserSettingsPF2e, UserSourcePF2e } from "./data.js";
declare class UserPF2e extends User {
    prepareData(): void;
    /** Set user settings defaults */
    prepareBaseData(): void;
    get settings(): Readonly<UserSettingsPF2e>;
    /** Get tokens controlled by this user or, failing that, a token of the assigned character. */
    getActiveTokens(): TokenDocumentPF2e[];
    /** Alternative to calling `updateTokenTargets` with no argument or an empty array */
    clearTargets(): void;
    protected _onUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateCallbackOptions, userId: string): void;
}
interface UserPF2e extends User {
    character: ActorPF2e<null> | null;
    targets: UserTargets<TokenPF2e<TokenDocumentPF2e<ScenePF2e>>>;
    flags: UserFlagsPF2e;
    readonly _source: UserSourcePF2e;
    query(name: `${SystemId}.trade`, data: TradeQueryData, options?: {
        timeout?: number;
    }): Promise<TradeQueryResponse>;
    query(name: string, data: object, options?: {
        timeout?: number;
    }): Promise<unknown>;
}
export { UserPF2e };
