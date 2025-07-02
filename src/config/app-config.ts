import * as process from "node:process";

export const appConfig = {
    nodeEnv: process.env.NODE_ENV || "production",
    appPort: process.env.APP_PORT || 3000,
    appHost: process.env.APP_HOST || "localhost",
    whatsappServiceUrl: process.env.WHATSAPP_SERVICE_URL || "",
    sessionId: process.env.SESSION_ID || "",
}