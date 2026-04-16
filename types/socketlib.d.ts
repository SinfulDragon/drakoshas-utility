export {};

declare global {
  interface SocketlibSocket {
    register(name: string, fn: (...args: never[]) => unknown): void;
    executeAsGM<T = unknown>(name: string, ...args: unknown[]): Promise<T>;
    executeAsUser<T = unknown>(name: string, userId: string, ...args: unknown[]): Promise<T>;
    executeForAllGMs(name: string, ...args: unknown[]): Promise<void>;
    executeForOtherGMs(name: string, ...args: unknown[]): Promise<void>;
    executeForEveryone(name: string, ...args: unknown[]): Promise<void>;
    executeForOthers(name: string, ...args: unknown[]): Promise<void>;
    executeForUsers(name: string, recipients: string[], ...args: unknown[]): Promise<void>;
  }

  interface SocketlibApi {
    registerModule(moduleId: string): SocketlibSocket;
    registerSystem(systemId: string): SocketlibSocket;
  }

  const socketlib: SocketlibApi;
}
