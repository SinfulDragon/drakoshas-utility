declare const Hooks: {
  once(event: string, callback: (...args: unknown[]) => void): void;
};

declare const game: {
  system: {
    id: string;
  };
  settings: {
    register(
      namespace: string,
      key: string,
      data: {
        name: string;
        hint: string;
        scope: "world" | "client";
        config: boolean;
        type: BooleanConstructor | StringConstructor | NumberConstructor;
        default: boolean | string | number;
      }
    ): void;
  };
};
