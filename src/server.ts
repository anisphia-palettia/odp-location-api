import app from "@/app.ts";
import {appConfig} from "@/config/app-config.ts";
import {logger} from "@/lib/logger.ts";

function main() {
  Bun.serve({
    fetch: app.fetch,
    port: appConfig.appPort,
  });

  logger.info(`Server running in port ${appConfig.appPort}`)
}

main()
