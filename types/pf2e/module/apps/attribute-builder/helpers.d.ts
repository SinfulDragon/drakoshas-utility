/** Shared types and utilities for attribute/ability builders */
import type { AttributeString } from "@actor/types.js";
import type { KingdomAbility } from "@actor/party/kingdom/types.js";
type BuilderAttribute = AttributeString | KingdomAbility;
interface BuilderButton {
    selected?: boolean;
    locked?: boolean;
    disabled?: boolean;
    partial?: boolean;
}
interface BoostFlawState {
    flaw?: BuilderButton;
    boost?: BuilderButton;
}
/** Creates a record of button states keyed by attribute */
declare function createButtonRecord<TAttr extends BuilderAttribute, TState extends BoostFlawState>(attributes: readonly TAttr[], builder: (attr: TAttr) => TState): Record<TAttr, TState>;
export { createButtonRecord };
export type { BoostFlawState, BuilderAttribute, BuilderButton };
