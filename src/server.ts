import app from "@/app.ts";
import {appConfig} from "@/config/app-config.ts";
import {logger} from "@/lib/logger.ts";
import {closeBrowser} from "@/utils/puppeteer-browser.ts";

function main() {
    Bun.serve({
        fetch: app.fetch,
        port: appConfig.appPort,
    });

    logger.info(`Server running in port ${appConfig.appPort}`)

    process.on('SIGINT', async () => {
        console.log('Shutting down...');
        await closeBrowser();
        process.exit();
    });
}

main()
