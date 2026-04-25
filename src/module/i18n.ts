export function localize(key: string): string {
  return game.i18n.localize(key);
}

export function format(
  key: string,
  data: Record<string, string | number>
): string {
  return game.i18n.format(key, data);
}
