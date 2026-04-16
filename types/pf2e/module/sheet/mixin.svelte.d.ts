interface SvelteApplicationRenderContext extends fa.ApplicationRenderContext {
    /** State data tracked by the root component: objects herein must be plain object. */
    state: object;
    /** This application instance */
    foundryApp?: SvelteApplication;
}
declare function SvelteApplicationMixin<TBase extends AbstractConstructorOf<fa.api.ApplicationV2> & {
    DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
}>(Base: TBase): (abstract new () => {
    root: any;
    /** State data tracked by the root component */
    $state: object;
    /** The mounted root component, saved to be unmounted on application close */
    "__#private@#mount": object;
    _prepareContext(options: fa.ApplicationRenderOptions): Promise<SvelteApplicationRenderContext>;
    _renderHTML(context: SvelteApplicationRenderContext): Promise<SvelteApplicationRenderContext>;
    _replaceHTML(result: SvelteApplicationRenderContext, content: HTMLElement, options: fa.ApplicationRenderOptions): void;
    _onClose(options: fa.ApplicationClosingOptions): void;
}) & {
    DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
};
type SvelteApplication = InstanceType<ReturnType<typeof SvelteApplicationMixin>>;
export { SvelteApplicationMixin, type SvelteApplicationRenderContext };
