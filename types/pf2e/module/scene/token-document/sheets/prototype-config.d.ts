import type { FormDataExtended } from "@client/applications/ux/_module.d.mts";
declare const PrototypeTokenConfigPF2e_base: any;
declare class PrototypeTokenConfigPF2e extends PrototypeTokenConfigPF2e_base {
    get linkToActorSize(): boolean;
    get autoscale(): boolean;
    protected _processFormData(event: SubmitEvent | null, form: HTMLFormElement, formData: FormDataExtended): Record<string, unknown>;
    protected _processChanges(submitData: Record<string, unknown>): Promise<void>;
}
export { PrototypeTokenConfigPF2e };
