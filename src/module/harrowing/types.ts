export interface HarrowingSuit {
  name: string;
  labelKey: string;
  selector?: string;
  selectors?: string[];
}

export interface HarrowingCasterRef {
  id: string;
  name: string;
}

export interface HarrowingEffectParams {
  caster: HarrowingCasterRef;
  skillLabel: string;
  rollTotal: number;
  degree: number;
  suit: HarrowingSuit;
  ritualRank: number;
}

export interface HarrowingImmunityParams {
  caster: HarrowingCasterRef;
  ritualRank: number;
}
