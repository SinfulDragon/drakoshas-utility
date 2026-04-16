import { SkillSlug } from "@actor/types.js";
import { ItemSourcePF2e } from "@item/base/data/index.js";
import { ChoiceSetSource } from "@module/rules/rule-element/choice-set/data.js";
import { MigrationBase } from "../base.js";
export declare class Migration929RemoveSkillAbbreviations extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
export declare function isSizeChoice(rule: ChoiceSetSource): boolean;
export declare function resolveLongForm<T>(value: T): T | SkillSlug;
