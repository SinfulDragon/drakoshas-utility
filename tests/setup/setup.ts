import { vi } from "vitest";

const localizeMock = vi.fn((key: string) => key);
const formatMock = vi.fn((key: string, data: Record<string, unknown>) => {
  let result = key;
  for (const [k, v] of Object.entries(data)) {
    result = result.replace(`{${k}}`, String(v));
  }
  return result;
});

globalThis.game = {
  i18n: {
    localize: localizeMock,
    format: formatMock,
  },
  pf2e: {
    system: {
      sluggify: (s: string) => s.toLowerCase().replace(/\s+/g, "-"),
    },
  },
} as unknown as typeof game;

export { localizeMock, formatMock };
