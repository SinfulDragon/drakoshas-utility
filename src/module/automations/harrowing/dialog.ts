import type DialogV2 from "@client/applications/api/dialog.mjs";

export interface RitualOptions {
  ritualRank: number;
  ritualDCOverride: string;
}

function createSelectElement(
  name: string,
  labelKey: string,
  options: Array<{ value: number | string; label: string }>,
  selectedValue: number | string
): HTMLDivElement {
  const i18n = game.i18n;

  // Create form group container using Foundry conventions
  const formGroup = document.createElement("div");
  formGroup.className = "form-group";

  // Add label
  const label = document.createElement("label");
  label.htmlFor = name;
  label.textContent = i18n.localize(labelKey);

  formGroup.appendChild(label);

  // Create select using native DOM API (modern approach, no Handlebars)
  const select = document.createElement("select");
  select.id = name;
  select.name = name;

  for (const option of options) {
    const optElement = document.createElement("option");
    optElement.value = String(option.value);
    optElement.textContent = option.label;

    if (Number(option.value) === Number(selectedValue)) {
      optElement.setAttribute("selected", "");
    }

    select.appendChild(optElement);
  }

  formGroup.appendChild(select);

  return formGroup;
}

function createNumberInput(
  name: string,
  labelKey: string,
  placeholderKey?: string,
  value: number | string = ""
): HTMLDivElement {
  const i18n = game.i18n;

  // Create form group container using Foundry conventions
  const formGroup = document.createElement("div");
  formGroup.className = "form-group";

  // Add label
  const label = document.createElement("label");
  label.htmlFor = name;
  label.textContent = i18n.localize(labelKey);
  formGroup.appendChild(label);

  // Create number input
  const input = document.createElement("input");
  input.id = name;
  input.name = name;
  input.type = "number";
  input.inputMode = "numeric";

  if (placeholderKey) {
    input.placeholder = i18n.localize(placeholderKey);
  }

  input.value = String(value);

  formGroup.appendChild(input);

  return formGroup;
}

/**
 * Creates the ritual options dialog content using modern DOM API.
 * Replaces deprecated Handlebars {{select}} helper with native element creation.
 * Wraps form in a div to satisfy DialogV2 content type requirements.
 */
function createRitualDialogContent(maxRank: number): HTMLDivElement {
  const i18n = game.i18n;

  // Generate rank options (modern JS, no Handlebars)
  const rankOptions = Array.from({ length: maxRank }, (_, i) => ({
    value: i + 1,
    label: i18n.format("DRAKOSHAS_UTILITY.Harrowing.Dialog.RankOption", {
      rank: i + 1
    })
  }));

  // Create form element
  const form = document.createElement("form");

  // Add rank select using DOM API (no deprecated {{select}})
  const rankField = createSelectElement(
    "harrowing-rank",
    "DRAKOSHAS_UTILITY.Harrowing.Dialog.RankLabel",
    rankOptions,
    maxRank
  );
  form.appendChild(rankField);

  // Add DC override input
  const dcInput = createNumberInput(
    "harrowing-dc-override",
    "DRAKOSHAS_UTILITY.Harrowing.Dialog.DCLabel",
    "DRAKOSHAS_UTILITY.Harrowing.Dialog.DCPlaceholder"
  );
  form.appendChild(dcInput);

  // Wrap form in a div to satisfy DialogV2 content type requirements
  const container = document.createElement("div");
  container.appendChild(form);

  return container;
}

/**
 * Opens a dialog to let the user select ritual rank and optional DC override.
 * Uses modern FoundryVTT v13+ API without deprecated Handlebars helpers.
 */
export async function askRitualOptions(
  maxRank: number
): Promise<RitualOptions | null> {
  const i18n = game.i18n;

  // Create dialog content using modern DOM API (no Handlebars template)
  const contentDiv = createRitualDialogContent(maxRank);

  let selectedRank = maxRank;
  let dcOverride = "";

  const result = await foundry.applications.api.DialogV2.wait({
    window: {
      title: i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Dialog.Title"),
      resizable: true
    },
    position: { width: 420, height: "auto" },
    content: contentDiv,
    buttons: [
      {
        action: "ok",
        label: i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Dialog.Confirm"),
        default: true,
        callback: (
          _event: PointerEvent | SubmitEvent,
          _button: HTMLButtonElement,
          dialog: DialogV2
        ) => {
          const form =
            dialog.element.querySelector<HTMLFormElement>("form") ??
            (dialog.element instanceof HTMLFormElement ? dialog.element : null);

          if (form) {
            const data = new foundry.applications.ux.FormDataExtended(form)
              .object as {
              "harrowing-rank"?: number | string;
              "harrowing-dc-override"?: number | string;
            };

            selectedRank = Number(data["harrowing-rank"] ?? maxRank);
            const raw = data["harrowing-dc-override"];
            dcOverride = raw == null ? "" : String(raw).trim();
          }

          return "ok";
        }
      },
      {
        action: "cancel",
        label: i18n.localize("DRAKOSHAS_UTILITY.Harrowing.Dialog.Cancel"),
        callback: () => "cancel"
      }
    ],
    rejectClose: false
  });

  if (result !== "ok") return null;

  return {
    ritualRank: Number.isFinite(selectedRank) ? selectedRank : maxRank,
    ritualDCOverride: dcOverride
  };
}
