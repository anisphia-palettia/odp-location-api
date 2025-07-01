import {LocalHono} from "@/types/LocalHono.ts";
import {sendSuccess} from "@/utils/response.ts";
import type {IWhatsappWebhookMessage} from "@/types/whatsapp.ts";
import {getCoordinatesFromTimemark} from "@/utils/scrapping.ts";
import {saveFile} from "@/utils/save-file.ts";
import {appConfig} from "@/config/app-config.ts";
import * as path from "node:path";
import {GroupService} from "@/service/group-service.ts";
import {CoordinateService} from "@/service/coordinate-service.ts";
import {logger} from "@/lib/logger.ts";

const r_webhook = new LocalHono()

r_webhook.post("", async (c) => {
    const data = await c.req.json() as IWhatsappWebhookMessage;

    logger.info(`[${data.messageId}] Webhook diterima dari ${data.name}`);

    const match = data.text.match(/Lokasi dan Verifikasi[:：]?[^\n]*/i);
    const filter = match?.[0] ?? null;

    if (!filter) {
        logger.warn(`[${data.messageId}] Dilewatkan - tidak mengandung 'Lokasi dan Verifikasi'`);
        return sendSuccess(c, {
            message: "Dilewatkan: tidak mengandung 'Lokasi dan Verifikasi'",
            data: null
        });
    }

    const lines = data.text.split('\n');
    const rawLink = lines[1]?.trim();

    const normalizedLink = rawLink
        ? rawLink.startsWith('http') ? rawLink : `https://${rawLink}`
        : null;


    logger.info(`[${data.messageId}] Link ditemukan: ${normalizedLink}`);

    const coordinates = normalizedLink ? await getCoordinatesFromTimemark(normalizedLink) : null;

    if (!coordinates) {
        logger.warn(`[${data.messageId}] Gagal mendapatkan koordinat dari link`);
        return sendSuccess(c, {
            message: "Koordinat tidak ditemukan",
            data: null
        });
    }

    const latStr = coordinates.lat ?? 'unknown_lat';
    const longStr = coordinates.long ?? 'unknown_long';

    if (!data.mediaPath) {
        logger.warn(`[${data.messageId}] Dilewatkan - tidak mengandung media`);
        return sendSuccess(c, {
            message: "Dilewatkan: tidak mengandung media",
            data: null
        });
    }

    const ext = path.extname(data.mediaPath) || '.jpg';
    const fileName = `${latStr}_${longStr}${ext}`;
    const relativeFilePath = path.join(data.name, fileName);
    const mediaUrl = appConfig.whatsappServiceUrl + `/${data.mediaPath}`;

    logger.info(`[${data.messageId}] Menyimpan file dari ${mediaUrl} ke ${relativeFilePath}`);

    try {
        const fullPath = await saveFile(mediaUrl, relativeFilePath);
        logger.info(`[${data.messageId}] File berhasil disimpan: ${fullPath}`);

        const exist = await GroupService.getByChatId(data.chatId);
        const group = exist ?? await GroupService.create(
            {
                name: data.name,
                chatId: data.chatId
            }
        )

        await CoordinateService.create(coordinates, fullPath, group.id);

        logger.info(`[${data.messageId}] Koordinat dan grup berhasil disimpan ke database`);

        return sendSuccess(c, {
            message: "Success save",
            data
        });
    } catch (err) {
        logger.error(`[${data.messageId}] Error saat menyimpan file atau menyimpan ke DB`, err);
        return sendSuccess(c, {
            message: "Gagal menyimpan file atau menyimpan ke database",
            data: null
        });
    }
});

export default r_webhook;
