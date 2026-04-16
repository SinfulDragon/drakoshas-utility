import type { HandlebarsRenderOptions } from "@client/applications/api/handlebars-application.d.mts";
import { ScenePF2e } from "@scene/index.js";
import "nouislider/dist/nouislider.min.css";
export declare class SceneDarknessAdjuster extends fa.api.ApplicationV2 {
    #private;
    static get instance(): SceneDarknessAdjuster;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    render(options?: Partial<HandlebarsRenderOptions & {
        scenes?: ScenePF2e[];
    }>): Promise<this>;
    protected _renderHTML(_context: object): Promise<HTMLElement>;
    protected _replaceHTML(result: HTMLElement, element: HTMLElement, options: fa.ApplicationRenderOptions): void;
    protected _onRender(context: object, options: fa.api.HandlebarsRenderOptions): Promise<void>;
    onLightingRefresh(darkness: number): void;
}
