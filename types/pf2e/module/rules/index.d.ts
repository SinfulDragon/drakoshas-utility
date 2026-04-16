import { LaxSchemaField } from "@system/schema-data-fields.js";
import { RuleElement } from "./rule-element/base.js";
import type { RuleElementOptions, RuleElementSchema, RuleElementSource } from "./rule-element/index.js";
export type { RuleElementSynthetics } from "./synthetics.js";
/**
 * @category RuleElement
 */
declare class RuleElements {
    static readonly builtin: Record<string, RuleElementConstructor>;
    static custom: Record<string, RuleElementConstructor>;
    static get all(): Record<string, RuleElementConstructor>;
    static fromOwnedItem(options: RuleElementOptions): RuleElement[];
}
type RuleElementConstructor = {
    schema: LaxSchemaField<RuleElementSchema>;
    LOCALIZATION_PREFIXES: string[];
} & (new (data: RuleElementSource, options: RuleElementOptions) => RuleElement);
export { RuleElement, RuleElementOptions, RuleElements, RuleElementSource };
