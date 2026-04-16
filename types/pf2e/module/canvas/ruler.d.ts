import type { ElevatedPoint } from "@common/_types.d.mts";
export declare class RulerPF2e extends fc.interaction.Ruler {
    get path(): readonly Readonly<ElevatedPoint>[];
    set path(value: ElevatedPoint[]);
}
