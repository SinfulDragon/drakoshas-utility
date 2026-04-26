import { Logger } from "@/module/logger.ts";

const TEMPLATE_PATHS: string[] = [];

export async function registerTemplates(): Promise<void> {
  Logger.debug("registerTemplates: loading templates");
  await foundry.applications.handlebars.loadTemplates(TEMPLATE_PATHS);
  Logger.debug("registerTemplates: templates loaded");
}
