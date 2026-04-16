import type { HandlebarsRenderOptions } from "@client/applications/api/handlebars-application.d.mts";
import type { ContextMenuEntry } from "@client/applications/ux/context-menu.d.mts";
import type { ItemPF2e } from "@item";
/** Extend ItemDirectory to show more information */
export declare class ItemDirectoryPF2e extends fa.sidebar.tabs.ItemDirectory<ItemPF2e<null>> {
    #private;
    protected static _entryPartial: string;
    static DEFAULT_OPTIONS: DeepPartial<fa.sidebar.DocumentDirectoryConfiguration>;
    protected _onRender(context: object, options: HandlebarsRenderOptions): Promise<void>;
    /** Add `ContextMenuEntry` to attach physical items */
    protected _getEntryContextOptions(): ContextMenuEntry[];
}
