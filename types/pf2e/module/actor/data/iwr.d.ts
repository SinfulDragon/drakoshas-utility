import { ImmunityType, IWRType, ResistanceType, WeaknessType } from "@actor/types.js";
import { IWRException } from "@module/rules/rule-element/iwr/base.js";
import { Predicate, PredicateStatement } from "@system/predication.js";
declare abstract class IWR<TType extends IWRType> {
    #private;
    readonly type: TType;
    value?: number;
    readonly exceptions: IWRException<TType>[];
    readonly doubleVs?: IWRException<TType>[];
    /** A definition for a custom IWR */
    readonly definition: Predicate | null;
    source: string | null;
    protected abstract readonly typeLabels: Record<TType, string>;
    constructor(data: IWRConstructorData<TType>);
    get label(): string;
    /** A label showing the type, exceptions, and doubleVs but no value (in case of weaknesses and resistances) */
    get applicationLabel(): string;
    /** A label consisting of just the type */
    get typeLabel(): string;
    protected describe(iwrType: IWRException<TType>): PredicateStatement[];
    get predicate(): Predicate;
    toObject(): Readonly<IWRDisplayData<TType>>;
    test(statements: string[] | Set<string>): boolean;
}
type IWRConstructorData<TType extends IWRType> = {
    type: TType;
    exceptions?: IWRException<TType>[];
    customLabel?: Maybe<string>;
    definition?: Maybe<Predicate>;
    source?: string | null;
};
type IWRDisplayData<TType extends IWRType> = Pick<IWR<TType>, "type" | "exceptions" | "source" | "label">;
declare class Immunity extends IWR<ImmunityType> implements ImmunitySource {
    protected readonly typeLabels: any;
    value?: never;
    readonly doubleVs?: never;
}
interface IWRSource<TType extends IWRType = IWRType> {
    type: TType;
    exceptions?: IWRException<TType>[];
}
type ImmunitySource = IWRSource<ImmunityType>;
declare class Weakness extends IWR<WeaknessType> implements WeaknessSource {
    protected readonly typeLabels: any;
    readonly doubleVs?: never;
    value: number;
    readonly applyOnce: boolean;
    constructor(data: IWRConstructorData<WeaknessType> & {
        value: number;
        applyOnce?: boolean;
    });
    toObject(): Readonly<WeaknessDisplayData>;
}
type WeaknessDisplayData = IWRDisplayData<WeaknessType> & Pick<Weakness, "value">;
interface WeaknessSource extends IWRSource<WeaknessType> {
    value: number;
    applyOnce?: boolean;
}
declare class Resistance extends IWR<ResistanceType> implements ResistanceSource {
    protected readonly typeLabels: any;
    value: number;
    readonly doubleVs: IWRException<ResistanceType>[];
    constructor(data: IWRConstructorData<ResistanceType> & {
        value: number;
        doubleVs?: IWRException<ResistanceType>[];
    });
    toObject(): ResistanceDisplayData;
    /** Get the doubled value of this resistance if present and applicable to a given instance of damage */
    getDoubledValue(damageDescription: Set<string>): number;
}
type ResistanceDisplayData = IWRDisplayData<ResistanceType> & Pick<Resistance, "value" | "doubleVs">;
interface ResistanceSource extends IWRSource<ResistanceType> {
    value: number;
    doubleVs?: IWRException<ResistanceType>[];
}
/** Weaknesses to things that "[don't] normally deal damage, such as water": applied separately as untyped damage */
declare const APPLY_ONCE_WEAKNESSES: Set<WeaknessType>;
export { APPLY_ONCE_WEAKNESSES, Immunity, Resistance, Weakness };
export type { ImmunitySource, IWRSource, ResistanceSource, WeaknessSource };
