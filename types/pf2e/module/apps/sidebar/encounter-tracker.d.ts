import type { ApplicationRenderContext } from "@client/applications/_types.d.mts";
import type { HandlebarsRenderOptions } from "@client/applications/api/handlebars-application.d.mts";
import type { TurnContext } from "@client/applications/sidebar/tabs/combat-tracker.mjs";
import type { CombatantPF2e, EncounterPF2e } from "@module/encounter/index.js";
import type { TokenDocumentPF2e } from "@scene/index.js";
import tabs = fa.sidebar.tabs;
export declare class EncounterTracker<TEncounter extends EncounterPF2e | null> extends tabs.CombatTracker<TEncounter> {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: any;
    protected _configureRenderOptions(options: Partial<HandlebarsRenderOptions>): void;
    protected _preparePartContext(partId: string, context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
    protected _prepareTurnContext(combat: NonNullable<TEncounter>, combatant: CombatantPF2e, index: number): Promise<TurnContext>;
    protected _renderHTML(context: object, options: HandlebarsRenderOptions): Promise<Record<string, HTMLElement>>;
    /** Show encounter analysis data if obtainable */
    protected _onRender(context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<void>;
    /** Refresh the list of users targeting a combatant's token as well as the active state of the target toggle */
    refreshTargetDisplay(combatantOrToken: CombatantPF2e | TokenDocumentPF2e, trackers?: HTMLElement[]): void;
    /** For some reason, upstream handles these actions in an override of this method. */
    protected _onClickAction(event: PointerEvent, target: HTMLElement): Promise<void>;
    /** Allow CTRL-clicking to make the roll blind */
    protected _onCombatantControl(event: PointerEvent, target: HTMLElement): Promise<void>;
    /** Replace parent method with system-specific procedure */
    protected _onToggleDefeatedStatus(combatant: CombatantPF2e<TEncounter>): Promise<void>;
    /** Ping all tokens involved with the combatant for troops */
    protected _onPingCombatant(combatant: CombatantPF2e): Promise<boolean | void>;
}
