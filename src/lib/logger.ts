import * as winston from "winston";
import {appConfig} from "@/config/app-config.ts";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.printf(
            ({timestamp, level, message}) =>
                `[${timestamp}] ${level.toUpperCase()}: ${message}`,
        ),
    ),
    transports: [
        new winston.transports.File({filename: "logs/error.log", level: "error"}),
        new winston.transports.File({filename: "logs/combined.log"}),
        ...(appConfig.nodeEnv !== "production"
            ? [new winston.transports.Console({format: winston.format.simple()})]
            : []),
    ],
});