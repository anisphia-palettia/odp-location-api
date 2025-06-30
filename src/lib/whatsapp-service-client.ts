import axios from "axios";
import {appConfig} from "@/config/app-config.ts";
import {logger} from "@/lib/logger.ts";

const whatsappServiceClient = axios.create({
    baseURL: appConfig.whatsappServiceUrl,
    validateStatus: () => true,
});

whatsappServiceClient.interceptors.request.use((config) => {
    logger.info(`[whatsapp-service] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
});

export default whatsappServiceClient;