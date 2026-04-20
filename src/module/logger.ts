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
    console.log(Logger.prefix(), "[INFO]", ...args);
  }

  static warn(...args: unknown[]): void {
    console.warn(Logger.prefix(), "[WARN]", ...args);
  }

  static error(...args: unknown[]): void {
    console.error(Logger.prefix(), "[ERROR]", ...args);
  }

  static debug(...args: unknown[]): void {
    if (!Logger.debugEnabled) return;
    console.debug(Logger.prefix(), "[DEBUG]", ...args);
  }
}
