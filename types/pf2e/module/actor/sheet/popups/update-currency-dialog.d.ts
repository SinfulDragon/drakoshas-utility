import { ActorPF2e } from "@actor/base.js";
declare const UpdateCurrencyDialog_base: any;
/** Simple dialog to add currency of various denominations to an actor */
declare class UpdateCurrencyDialog extends UpdateCurrencyDialog_base {
    #private;
    constructor(options: Partial<UpdateCurrencyConfiguration> & Required<Pick<UpdateCurrencyConfiguration, "actor" | "mode">>);
    static DEFAULT_OPTIONS: DeepPartial<UpdateCurrencyConfiguration>;
    static PARTS: {
        base: {
            template: string;
            root: boolean;
        };
    };
    actor: ActorPF2e;
    mode: "add" | "remove";
    get title(): string;
    protected _prepareContext(options: fa.ApplicationRenderOptions): Promise<UpdateCurrencyContext>;
}
interface UpdateCurrencyConfiguration extends fa.api.DialogV2Configuration {
    actor: ActorPF2e;
    mode: "add" | "remove";
}
interface UpdateCurrencyContext extends fa.ApplicationRenderContext {
    id: string;
    actor: ActorPF2e;
    mode: "add" | "remove";
    denominations: {
        key: string;
        label: string;
    }[];
    actionLabel: string;
}
export { UpdateCurrencyDialog };
