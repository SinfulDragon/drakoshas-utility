import { moduleId } from "./helpers.ts";

export class Logger {
  private static debugEnabled = false;

  private static prefix(): string {
    return `[${moduleId()}]`;
  }

  static setDebugEnabled(value: boolean): void {
    Logger.debugEnabled = value;
  }

  static isDebugEnabled(): boolean {
    return Logger.debugEnabled;
  }

  static info(...args: unknown[]): void {
    console.log(Logger.prefix(), ...args);
  }

  static warn(...args: unknown[]): void {
    console.warn(Logger.prefix(), ...args);
  }

  static error(...args: unknown[]): void {
    console.error(Logger.prefix(), ...args);
  }

  static debug(...args: unknown[]): void {
    if (!Logger.debugEnabled) return;
    console.debug(Logger.prefix(), ...args);
  }
}
