import axios from "axios";
import {appConfig} from "@/config/app-config.ts";
import {logger} from "@/lib/logger.ts";

const whatsappServiceClient = axios.create({
    baseURL: appConfig.whatsappServiceUrl,
<<<<<<< HEAD
=======
    timeout: 10000,
>>>>>>> fcbe43286b97e0c570b5621429d10485615e6254
    validateStatus: () => true,
});

whatsappServiceClient.interceptors.request.use((config) => {
    logger.info(`[whatsapp-service] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
});

export default whatsappServiceClient;