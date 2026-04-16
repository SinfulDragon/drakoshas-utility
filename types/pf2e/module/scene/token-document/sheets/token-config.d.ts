import type FormDataExtended from "@client/applications/ux/form-data-extended.d.mts";
import type { DatabaseCreateOperation, DatabaseUpdateOperation } from "@common/abstract/_types.d.mts";
declare const TokenConfigPF2e_base: any;
declare class TokenConfigPF2e extends TokenConfigPF2e_base {
    get linkToActorSize(): boolean;
    get autoscale(): boolean;
    protected _processFormData(event: SubmitEvent | null, form: HTMLFormElement, formData: FormDataExtended): Record<string, unknown>;
    protected _processSubmitData(event: SubmitEvent, form: HTMLFormElement, submitData: Record<string, unknown>, options?: Partial<DatabaseCreateOperation<Scene | null>> | Partial<DatabaseUpdateOperation<Scene | null>>): Promise<void>;
}
export { TokenConfigPF2e };
