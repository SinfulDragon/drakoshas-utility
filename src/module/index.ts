import "@/styles/module.scss";

import { registerInitHook } from "./hooks/init.ts";
import { registerSetupHook } from "./hooks/setup.ts";
import { registerReadyHook } from "./hooks/ready.ts";
import { registerPreCreateItemHook } from "./hooks/pre-create-item.ts";

registerInitHook();
registerSetupHook();
registerReadyHook();
registerPreCreateItemHook();
