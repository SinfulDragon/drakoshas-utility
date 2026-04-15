import "@/styles/module.scss";

import { registerInitHook } from "./hooks/init.ts";
import { registerSetupHook } from "./hooks/setup.ts";
import { registerReadyHook } from "./hooks/ready.ts";

registerInitHook();
registerSetupHook();
registerReadyHook();
