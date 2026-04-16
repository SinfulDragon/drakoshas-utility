import type { ActorPF2e } from "@actor";
import type { ApplicationConfiguration } from "@client/applications/_module.d.mts";
import type { DamageType } from "@system/damage/types.js";
declare const PersistentDamageEditor_base: any;
declare class PersistentDamageEditor extends PersistentDamageEditor_base {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    actor: ActorPF2e;
    selectedItemId: string | null;
    constructor(options: DeepPartial<ApplicationConfiguration> & PersistentDamageDialogOptions);
    /** Override to guarantee one persistent damage dialog per actor */
    get id(): string;
    get title(): string;
    protected _prepareContext(): Promise<PersistentDialogContext>;
    protected _onChangeForm(formConfig: fa.ApplicationFormConfiguration, event: Event): void;
}
interface PersistentDamageDialogOptions {
    actor: ActorPF2e;
    selectedItemId?: string;
}
interface PersistentDialogContext extends fa.ApplicationRenderContext {
    selectedItemId: string | null;
    existing: DamageEntryData[];
    damageTypes: DamageTypeData[];
}
interface DamageEntryData {
    id: string;
    active: boolean;
    formula: string;
    damageType: DamageType;
    dc: number;
}
interface DamageTypeData {
    type: string;
    label: string;
}
export { PersistentDamageEditor };
