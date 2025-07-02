import "dotenv/config.js"
import app from "@/app.ts";
import {appConfig} from "@/config/app-config.ts";
import {logger} from "@/lib/logger.ts";
import {serve} from "@hono/node-server";
import {closeBrowser} from "@/utils/browser-manager.ts";

function main() {
    serve({
        port: Number(appConfig.appPort),
        fetch: app.fetch,
    });

    logger.info(`Server running in port ${appConfig.appPort}`)

    process.on('SIGINT', async () => {
        console.log('\n🛑 Menutup browser...');
        await closeBrowser();
        process.exit(0);
    });
}

main()
