import type { ActorPF2e, CreaturePF2e } from "@actor";
import type { EffectPF2e } from "@item";

import { Logger } from "@/module/logger.ts";
import { getRitualDC } from "../../pf2e/dc.ts";
import { getMaxRitualRank } from "../../pf2e/ritual.ts";
import { pickHarrowingSkill } from "../../pf2e/skill-selection.ts";
import { getSocket } from "../../socket/index.ts";
import { askRitualOptions } from "./dialog.ts";
import {
  buildHarrowingEffectSource,
  buildHarrowingImmunitySource
} from "./effects.ts";
import { SUIT_MAP } from "./suits.ts";
import type { HarrowingCasterRef } from "./types.ts";

interface HarrowingEffectFlags {
  world?: { harrowing?: { immunity?: boolean } };
}

function asCreature(actor: ActorPF2e): CreaturePF2e | null {
  if (!("skills" in actor)) return null;
  if (typeof (actor as { skills?: unknown }).skills !== "object") return null;
  return actor as unknown as CreaturePF2e;
}

function warn(message: string): void {
  ui.notifications?.warn(message);
  Logger.warn(message);
}

function error(message: string): void {
  ui.notifications?.error(message);
  Logger.error(message);
}

function localize(key: string): string {
  return game.i18n.localize(key);
}

function format(key: string, data: Record<string, string | number>): string {
  return game.i18n.format(key, data);
}

export async function runHarrowing(): Promise<void> {
  Logger.debug("runHarrowing: start");
  const controlled = canvas.tokens?.controlled ?? [];
  const casterToken = controlled[0];
  if (!casterToken)
    return warn(localize("DRAKOSHAS_UTILITY.Harrowing.Warn.SelectCaster"));
  if (controlled.length > 1) {
    return warn(localize("DRAKOSHAS_UTILITY.Harrowing.Warn.OnlyOneCaster"));
  }
  if (game.user.targets.size !== 1) {
    return warn(localize("DRAKOSHAS_UTILITY.Harrowing.Warn.SelectOneTarget"));
  }

  const caster = casterToken.actor;
  const targetToken = [...game.user.targets][0];
  const target = targetToken?.actor ?? null;

  if (!caster || !target) {
    return error(
      localize("DRAKOSHAS_UTILITY.Harrowing.Error.ActorsUnresolved")
    );
  }
  const creatureCaster = asCreature(caster);
  if (!creatureCaster) {
    return error(localize("DRAKOSHAS_UTILITY.Harrowing.Error.NotCreature"));
  }

  Logger.debug(
    `runHarrowing: caster=${caster.name} (id=${caster.id}), target=${target.name} (uuid=${target.uuid})`
  );

  const maxRank = getMaxRitualRank(creatureCaster);
  Logger.debug(`runHarrowing: maxRitualRank=${maxRank}`);
  const ritualOptions = await askRitualOptions(maxRank);
  if (!ritualOptions) {
    Logger.debug("runHarrowing: dialog cancelled");
    return;
  }

  const ritualRank = ritualOptions.ritualRank;
  const ritualDC =
    ritualOptions.ritualDCOverride === ""
      ? getRitualDC(ritualRank)
      : Number(ritualOptions.ritualDCOverride);
  Logger.debug(
    `runHarrowing: ritualRank=${ritualRank}, ritualDC=${ritualDC} (override="${ritualOptions.ritualDCOverride}")`
  );

  if (!Number.isFinite(ritualDC) || ritualDC < 0) {
    return error(localize("DRAKOSHAS_UTILITY.Harrowing.Error.InvalidDC"));
  }

  const selection = pickHarrowingSkill(creatureCaster);
  if (!selection) {
    return error(
      localize("DRAKOSHAS_UTILITY.Harrowing.Error.InsufficientSkill")
    );
  }

  const { skill: chosen, label: skillLabel } = selection;
  Logger.debug(`runHarrowing: picked skill="${skillLabel}"`);

  const effects: EffectPF2e<ActorPF2e>[] = target.itemTypes.effect ?? [];
  const immuneEffect = effects.find((e) => {
    const flags = e.flags as unknown as HarrowingEffectFlags;
    return flags?.world?.harrowing?.immunity === true;
  });

  if (immuneEffect) {
    return warn(localize("DRAKOSHAS_UTILITY.Harrowing.Warn.AlreadyImmune"));
  }

  const casterRef: HarrowingCasterRef = { id: caster.id, name: caster.name };
  const targetUuid = target.uuid;
  const socket = getSocket();

  let appliedCount = 0;
  let interruptedByCriticalFailure = false;

  for (let i = 1; i <= ritualRank; i++) {
    const rollOptions = [
      "action:harrowing",
      "harrowing-primary-check",
      `harrowing-card:${i}`,
      `harrowing-rank:${ritualRank}`
    ];
    Logger.debug(
      `runHarrowing: card ${i}/${ritualRank} rolling check, DC=${ritualDC}, rollOptions=[${rollOptions.join(", ")}]`
    );

    const roll = await chosen.check.roll({
      dc: { value: ritualDC },
      extraRollOptions: rollOptions,
      createMessage: true
    });

    if (!roll) {
      error(
        format("DRAKOSHAS_UTILITY.Harrowing.Error.RollFailed", { card: i })
      );
      break;
    }

    const degree = roll.degreeOfSuccess ?? 0;
    Logger.debug(
      `runHarrowing: card ${i} rollTotal=${roll.total}, degreeOfSuccess=${degree}`
    );

    if (degree === 0) {
      const immunitySource = buildHarrowingImmunitySource({
        caster: casterRef,
        ritualRank
      });
      try {
        await socket.executeAsGM("applyImmunity", targetUuid, immunitySource);
      } catch (err) {
        error(
          format("DRAKOSHAS_UTILITY.Harrowing.Error.ImmunityFailed", {
            message: (err as Error).message
          })
        );
      }
      interruptedByCriticalFailure = true;
      break;
    }

    const suitRoll = await new Roll("1d6").evaluate();
    await suitRoll.toMessage({
      flavor: format("DRAKOSHAS_UTILITY.Harrowing.Roll.SuitFlavor", { card: i })
    });

    const suit = SUIT_MAP[suitRoll.total];
    if (!suit) {
      error(
        format("DRAKOSHAS_UTILITY.Harrowing.Error.SuitUnknown", { card: i })
      );
      break;
    }
    Logger.debug(
      `runHarrowing: card ${i} suitRoll=${suitRoll.total} -> suit key="${suit.labelKey}"`
    );

    const effectSource = buildHarrowingEffectSource({
      caster: casterRef,
      skillLabel,
      rollTotal: roll.total,
      degree,
      suit,
      ritualRank
    });

    try {
      await socket.executeAsGM("applyEffect", targetUuid, effectSource);
      appliedCount++;
    } catch (err) {
      error(
        format("DRAKOSHAS_UTILITY.Harrowing.Error.EffectFailed", {
          suit: game.i18n.localize(suit.labelKey),
          message: (err as Error).message
        })
      );
      break;
    }
  }

  Logger.debug(
    `Harrowing finished: applied=${appliedCount}, interrupted=${interruptedByCriticalFailure}`
  );
}
