import axios from "axios";
import {appConfig} from "@/config/app-config";
import {logger} from "@/lib/logger";

const whatsappServiceClient = axios.create({
    baseURL: appConfig.whatsappServiceUrl,
    timeout: 20000,
    validateStatus: () => true,
});

whatsappServiceClient.interceptors.request.use((config) => {
    logger.info(
        `[whatsapp-service] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
    );
    return config;
});

export default whatsappServiceClient;
