import { moduleId } from "./helpers.ts";

export class Logger {
  private static prefix(): string {
    return `[${moduleId()}]`;
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
    console.debug(Logger.prefix(), ...args);
  }
}
