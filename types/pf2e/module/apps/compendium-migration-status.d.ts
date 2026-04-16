import type { ActorPF2e } from "@actor";
import type CompendiumCollection from "@client/documents/collections/compendium-collection.d.mts";
import type { ItemPF2e } from "@item";
import appv1 = foundry.appv1;
/** Dialog used to view compendium data and migrate them. */
declare class CompendiumMigrationStatus extends appv1.api.Application {
    compendium: CompendiumCollection<ActorPF2e<null> | ItemPF2e<null>>;
    static get defaultOptions(): appv1.api.ApplicationV1Options;
    constructor(compendium: CompendiumCollection<ActorPF2e<null> | ItemPF2e<null>>);
    get id(): string;
    getData(options?: Partial<appv1.api.ApplicationV1Options> | undefined): Promise<object>;
    activateListeners($html: JQuery<HTMLElement>): void;
}
export { CompendiumMigrationStatus };
