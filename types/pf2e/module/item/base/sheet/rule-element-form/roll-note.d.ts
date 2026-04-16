import type { NoteRESource, RollNoteRuleElement } from "@module/rules/rule-element/roll-note.js";
import { RuleElementForm, RuleElementFormSheetData } from "./base.js";
/** Form handler for the RollNote rule element */
export declare class RollNoteForm extends RuleElementForm<NoteRESource, RollNoteRuleElement> {
    getData(): Promise<RuleElementFormSheetData<NoteRESource, RollNoteRuleElement>>;
}
