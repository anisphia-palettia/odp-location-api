export const appConfig = {
    nodeEnv: Bun.env.NODE_ENV || "production",
    appPort: Bun.env.PORT || 3000,
    whatsappServiceUrl: Bun.env.WHATSAPP_SERVICE_URL || "",
}