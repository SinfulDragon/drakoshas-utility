import type { DocumentFlags, DocumentFlagsSource } from "@common/data/_module.d.mts";
interface UserSettingsPF2e {
    showEffectPanel: boolean;
    showCheckDialogs: boolean;
    showDamageDialogs: boolean;
    monochromeDarkvision: boolean;
    searchPackContents: boolean;
}
type UserSourcePF2e = foundry.documents.UserSource & {
    flags: UserSourceFlagsPF2e;
};
type UserSourceFlagsPF2e = DocumentFlagsSource & {};
type UserFlagsPF2e = DocumentFlags & {};
export type { UserFlagsPF2e, UserSettingsPF2e, UserSourcePF2e };
