import type { UserSettingsPF2e } from "./data.js";
import type { UserPF2e } from "./document.js";
/** Player-specific settings, stored as flags on each User */
declare class UserConfigPF2e extends fa.sheets.UserConfig<UserPF2e> {
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: any;
    static TABS: Record<string, fa.ApplicationTabsConfiguration>;
    _prepareContext(options: fa.api.DocumentSheetRenderOptions): Promise<UserConfigRenderContextPF2e>;
}
interface UserConfigRenderContextPF2e extends fa.sheets.UserConfigRenderContext<UserPF2e> {
    tabs: Record<string, fa.ApplicationTab>;
    activeTab: string;
    systemId: SystemId;
    settings: UserSettingsPF2e;
}
export { UserConfigPF2e };
