import { Extension } from "@codemirror/state";
import type { DataSchema } from "@common/abstract/_types.d.mts";
export declare const CodeMirror: {
    EditorView: any;
    basicSetup: any;
    json: any;
    jsonLinter: () => Extension;
    keybindings: any;
    /** All language and autocomplete extensions for rule element editing */
    ruleElementExtensions: (options: RuleElementOptions) => Extension[];
};
interface RuleElementOptions {
    schema?: DataSchema;
}
export {};
