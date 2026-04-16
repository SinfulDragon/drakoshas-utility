import { ActorPF2e } from "@actor";
import type { HandlebarsRenderOptions, HandlebarsTemplatePart } from "@client/applications/api/handlebars-application.d.mts";
import type { ContextMenuEntry } from "@client/applications/ux/context-menu.d.mts";
import type { DropCanvasData } from "@client/helpers/hooks.d.mts";
/** Extend ActorDirectory to show more information */
declare class ActorDirectoryPF2e extends fa.sidebar.tabs.ActorDirectory<ActorPF2e<null>> {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<fa.sidebar.DocumentDirectoryConfiguration>;
    static PARTS: Record<string, HandlebarsTemplatePart>;
    protected static _entryPartial: string;
    _preparePartContext(partId: string, context: object, options: HandlebarsRenderOptions): Promise<object>;
    protected _prepareFooterContext(context: fa.ApplicationRenderContext & {
        buttons?: object[];
    }, options: HandlebarsRenderOptions): Promise<void>;
    saveActivePartyFolderState(): Promise<void>;
    render(options?: Partial<HandlebarsRenderOptions>): Promise<this>;
    _onRender(context: object, options: HandlebarsRenderOptions): Promise<void>;
    /** Collapses all open folders in this directory, including parties */
    collapseAll(): void;
    /** Overriden so matched actors in a party reveal their party "folder" as well */
    protected _onSearchFilter(event: KeyboardEvent, query: string, rgx: RegExp, html: HTMLElement): void;
    protected _onDragStart(event: DragEvent): void;
    /** Overriden to prevent highlighting of certain types of draggeed data (such as parties) */
    protected _onDragHighlight(event: DragEvent): void;
    protected _handleDroppedEntry(target: HTMLElement, data: ActorSidebarDropData): Promise<void>;
    /** Overriden to not fire folder events on party actors */
    protected _createContextMenus(): void;
    protected _getEntryContextOptions(): ContextMenuEntry[];
}
interface ActorSidebarDropData extends DropCanvasData<"actor", ActorPF2e> {
    fromParty?: string;
}
export { ActorDirectoryPF2e };
