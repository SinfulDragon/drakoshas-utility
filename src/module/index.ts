import "@/styles/module.scss";

import { registerInitHook } from "./hooks/init";
import { registerSetupHook } from "./hooks/setup";
import { registerReadyHook } from "./hooks/ready";

registerInitHook();
registerSetupHook();
registerReadyHook();
