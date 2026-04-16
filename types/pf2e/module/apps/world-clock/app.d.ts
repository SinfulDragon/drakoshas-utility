import type { HandlebarsRenderOptions, HandlebarsTemplatePart } from "@client/applications/api/handlebars-application.d.mts";
import { DateTime } from "luxon";
import { animateDarkness } from "./animate-darkness.js";
interface WorldClockRenderContext extends fa.ApplicationRenderContext {
    date: string;
    time: string;
    options?: object;
    user: User;
    sign: "+" | "-";
}
declare const WorldClock_base: any;
export declare class WorldClock extends WorldClock_base {
    #private;
    constructor();
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, HandlebarsTemplatePart>;
    readonly animateDarkness: typeof animateDarkness;
    /** Setting: the date theme (Imperial Calendar not yet supported) */
    get dateTheme(): "AR" | "IC" | "AG" | "AD" | "CE";
    /** Setting: display either a 24-hour or 12-hour clock */
    get timeConvention(): 24 | 12;
    /** Setting: whether to keep the scene's darkness level synchronized with the world time */
    get syncDarkness(): boolean;
    /** Setting: Date and time of the Foundry world's creation date */
    get worldCreatedOn(): DateTime;
    /** The current date and time of the game world */
    get worldTime(): DateTime;
    /** The era in the game */
    get era(): string;
    /** The year in the game */
    get year(): number;
    /** The month in the game */
    get month(): string;
    /** The day of the week in the game */
    get weekday(): string;
    protected _prepareContext(options: HandlebarsRenderOptions): Promise<WorldClockRenderContext>;
    protected _getHeaderControls(): fa.ApplicationHeaderControlsEntry[];
    /** Advance the world time by a static or input value */
    protected _onRender(context: WorldClockRenderContext, options: HandlebarsRenderOptions): Promise<void>;
    protected _onClose(options: fa.ApplicationClosingOptions): Promise<void>;
    /** Create a message informing the user that scene darkness is synced to world time */
    static createSyncedMessage(): HTMLSpanElement;
}
export {};
