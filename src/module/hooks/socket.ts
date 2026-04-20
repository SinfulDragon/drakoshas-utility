import { registerSocketlibHook } from "../socket/index.ts";
import {
  applyHarrowingEffect,
  applyHarrowingImmunity
} from "../automations/harrowing/gm-handlers.ts";

registerSocketlibHook({
  applyEffect: applyHarrowingEffect,
  applyImmunity: applyHarrowingImmunity
});
