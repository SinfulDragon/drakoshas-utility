import type { CharacterPF2e } from "@actor/character/document.js";
import { WeaponPF2e } from "@item";
import { ValueAndMax } from "@module/data.js";
import { BasePhysicalItemViewData } from "@module/sheet/helpers.js";
import { SvelteApplicationRenderContext } from "@module/sheet/mixin.svelte.js";
interface WeaponReloaderConfiguration extends fa.ApplicationConfiguration {
    weapon: WeaponPF2e<CharacterPF2e>;
}
declare const WeaponReloader_base: (abstract new () => {
    root: any;
    $state: object;
    "__#private@#mount": object;
    _prepareContext(options: fa.ApplicationRenderOptions): Promise<SvelteApplicationRenderContext>;
    _renderHTML(context: SvelteApplicationRenderContext): Promise<SvelteApplicationRenderContext>;
    _replaceHTML(result: SvelteApplicationRenderContext, content: HTMLElement, options: fa.ApplicationRenderOptions): void;
    _onClose(options: fa.ApplicationClosingOptions): void;
}) & {
    DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
};
declare class WeaponReloader extends WeaponReloader_base {
    #private;
    constructor(options: DeepPartial<WeaponReloaderConfiguration> & {
        anchor: HTMLElement | null;
    });
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    options: WeaponReloaderConfiguration;
    root: any;
    get glyph(): string | null;
    protected _initializeApplicationOptions(options: DeepPartial<fa.ApplicationConfiguration> & Partial<Pick<WeaponReloaderConfiguration, "weapon">>): fa.ApplicationConfiguration;
    protected _prepareContext(): Promise<ReloadWeaponContext>;
    reloadWeapon(ammoId: string, all?: boolean): Promise<void>;
    protected _prePosition(position: fa.ApplicationPosition): void;
    protected _onFirstRender(context: WeaponReloaderConfiguration, options: fa.ApplicationRenderOptions): Promise<void>;
    protected _tearDown(options: fa.ApplicationClosingOptions): void;
}
interface ReloadWeaponContext extends SvelteApplicationRenderContext {
    foundryApp: WeaponReloader;
    state: {
        loaded: ValueAndMax;
        weapon: BasePhysicalItemViewData;
        compatible: AmmoChoiceViewData[];
    };
}
interface AmmoChoiceViewData extends BasePhysicalItemViewData {
    quantity: number;
    uses: ValueAndMax | null;
    depleted: boolean;
}
export { WeaponReloader };
export type { ReloadWeaponContext };
