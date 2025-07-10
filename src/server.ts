import "dotenv/config.js";
import app from "@/app";
import {appConfig} from "@/config/app-config";
import {serve} from "@hono/node-server";
import {closeBrowser} from "@/utils/browser-manager";
import {resetId} from "./lib/prisma";

async function main() {
    await resetId();
    serve({
        port: Number(appConfig.appPort),
        fetch: app.fetch,
    });

    console.log(`===> Server running in port ${appConfig.appPort}`);

    process.on("SIGINT", async () => {
        console.log("===> Server is shutting down");
        await closeBrowser();
        process.exit(0);
    });
}

main();
