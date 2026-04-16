import type DialogV2 from "@client/applications/api/dialog.mjs";

export interface RitualOptions {
  ritualRank: number;
  ritualDCOverride: string;
}

export async function askRitualOptions(maxRank: number): Promise<RitualOptions | null> {
  const i18n = game.i18n;
  const optionsHtml = Array.from({ length: maxRank }, (_, i) => {
    const rank = i + 1;
    const selected = rank === maxRank ? "selected" : "";
    const label = i18n.format("DRAKOSHAS_UTILITY.Harrowing.Dialog.RankOption", { rank });
    return `<option value="${rank}" ${selected}>${label}</option>`;
  }).join("");

  let selectedRank = maxRank;
  let dcOverride = "";

  const rankLabel = i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Dialog.RankLabel");
  const dcLabel = i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Dialog.DCLabel");
  const dcPlaceholder = i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Dialog.DCPlaceholder");

  const result = await foundry.applications.api.DialogV2.wait({
    window: {
      title: i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Dialog.Title"),
      resizable: true,
    },
    position: { width: 420, height: "auto" },
    content: `
      <div class="form-group">
        <label for="harrowing-rank">${rankLabel}</label>
        <select id="harrowing-rank" name="harrowing-rank">
          ${optionsHtml}
        </select>
      </div>

      <div class="form-group">
        <label for="harrowing-dc-override">${dcLabel}</label>
        <input
          id="harrowing-dc-override"
          name="harrowing-dc-override"
          type="number"
          inputmode="numeric"
          placeholder="${dcPlaceholder}"
          value=""
        />
      </div>
    `,
    buttons: [
      {
        action: "ok",
        label: i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Dialog.Confirm"),
        default: true,
        callback: (
          _event: PointerEvent | SubmitEvent,
          _button: HTMLButtonElement,
          dialog: DialogV2,
        ) => {
          const form = dialog.element.querySelector<HTMLFormElement>("form")
            ?? (dialog.element instanceof HTMLFormElement ? dialog.element : null);
          if (form) {
            const data = new foundry.applications.ux.FormDataExtended(form).object as {
              "harrowing-rank"?: number | string;
              "harrowing-dc-override"?: number | string;
            };
            selectedRank = Number(data["harrowing-rank"] ?? maxRank);
            const raw = data["harrowing-dc-override"];
            dcOverride = raw == null ? "" : String(raw).trim();
          }
          return "ok";
        },
      },
      {
        action: "cancel",
        label: i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Dialog.Cancel"),
        callback: () => "cancel",
      },
    ],
    rejectClose: false,
  });

  if (result !== "ok") return null;

  return {
    ritualRank: Number.isFinite(selectedRank) ? selectedRank : maxRank,
    ritualDCOverride: dcOverride,
  };
}
