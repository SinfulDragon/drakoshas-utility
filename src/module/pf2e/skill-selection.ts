import type { CreaturePF2e } from "@actor";
import type { Statistic } from "@system/statistic/index.ts";

export interface HarrowingSkillSelection {
  skill: Statistic;
  label: string;
}

export function pickHarrowingSkill(actor: CreaturePF2e): HarrowingSkillSelection | null {
  const skills = actor.skills as unknown as Record<string, Statistic>;
  const occultism = skills["occultism"] ?? null;

  const loreSkills = Object.values(skills).filter((s) => {
    const slug = s.slug.toLowerCase();
    const label = s.label.toLowerCase();
    return slug === "fortune-telling-lore" || label.includes("fortune");
  });

  const fortuneLore = loreSkills.sort((a, b) => b.mod - a.mod)[0] ?? null;

  const validOccultism = !!occultism && (occultism.rank ?? 0) >= 2;
  const validFortuneLore = !!fortuneLore && (fortuneLore.rank ?? 0) >= 1;

  if (!validOccultism && !validFortuneLore) return null;

  const chosen: Statistic = (() => {
    if (validOccultism && validFortuneLore) {
      return fortuneLore!.mod > occultism!.mod ? fortuneLore! : occultism!;
    }
    return validOccultism ? occultism! : fortuneLore!;
  })();

  return { skill: chosen, label: chosen.label };
}
