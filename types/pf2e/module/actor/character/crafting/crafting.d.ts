import type { CharacterPF2e } from "../document.js";
import type { CraftingFormula } from "./types.js";
/** Caches and performs operations on elements related to crafting */
declare class CharacterCrafting {
    #private;
    actor: CharacterPF2e;
    abilities: any;
    constructor(actor: CharacterPF2e);
    /** Initializes the crafting data. Must be called every data preparation */
    initialize(): void;
    /**
     * Retrieves all formulas this actor knows including their associated items.
     * The result is cached until next data prep.
     */
    getFormulas(): Promise<CraftingFormula[]>;
    /** Removes all infused items and un-expends all prepared items */
    resetDailyCrafting(): Promise<void>;
    performDailyCrafting(): Promise<void>;
}
export { CharacterCrafting };
