export const appConfig = {
    nodeEnv: Bun.env.NODE_ENV || "production",
    appPort: Bun.env.APP_PORT || 3000,
    whatsappServiceUrl: Bun.env.WHATSAPP_SERVICE_URL || "",
    sessionId: Bun.env.SESSION_ID || "",
}