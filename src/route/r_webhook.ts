import {LocalHono} from "@/types/LocalHono";
import {sendSuccess} from "@/utils/response";
import type {IWhatsappWebhookMessage} from "@/types/whatsapp";
import {saveFile} from "@/utils/save-file";
import {appConfig} from "@/config/app-config";
import * as path from "node:path";
import {GroupService} from "@/service/group-service";
import {CoordinateService} from "@/service/coordinate-service";
import {logger} from "@/lib/logger";
import {getCoordinatesFromPage} from "@/utils/scrapping";
import WhatsappService from "@/service/whatsapp-service";
import {ErrorService} from "@/service/error-service";

const r_webhook = new LocalHono();

r_webhook.post("", async (c) => {
    const data = (await c.req.json()) as IWhatsappWebhookMessage;

    if (data.messageType === "unknown" && !data.text) {
        return;
    }

    logger.info(`[${data.messageId}] Webhook diterima dari ${data.name}`);

    const match = data.text.match(
        /(?:Lokasi|Location)\s*(?:dan|and|&)\s*(?:Verifikasi|Verification)[:：]?[^\n]*/i
    );
    const filter = match?.[0] ?? null;

    if (!filter) {
        logger.warn(
            `[${data.messageId}] Dilewatkan - tidak mengandung 'Lokasi dan Verifikasi'`
        );
        return sendSuccess(c, {
            message: "Dilewatkan: tidak mengandung 'Lokasi dan Verifikasi'",
            data: null,
        });
    }

    const lines = data.text.split("\n");
    const rawLink = lines[1]?.trim();

    const normalizedLink = rawLink
        ? rawLink.startsWith("http")
            ? rawLink
            : `https://${rawLink}`
        : null;

    logger.info(`[${data.messageId}] Link ditemukan: ${normalizedLink}`);

    if (!normalizedLink) {
        logger.warn(`[${data.messageId}] Link tidak valid`);
        return sendSuccess(c, {
            message: "Dilewatkan: link tidak valid",
            data: null,
        });
    }

    if (!data.mediaPath) {
        logger.warn(`[${data.messageId}] Dilewatkan - tidak mengandung media`);
        return sendSuccess(c, {
            message: "Dilewatkan: tidak mengandung media",
            data: null,
        });
    }

    const coordinates = await getCoordinatesFromPage(normalizedLink);

    if (!coordinates || !coordinates.lat || !coordinates.long) {
        logger.warn(`[${data.messageId}] Koordinat tidak ditemukan di halaman`);
        await WhatsappService().message.text(
            `Koordinat tidak ditemukan di halaman\n${normalizedLink}`,
            data.msg.key.remoteJid!,
            data.msg
        );
        await ErrorService.create(normalizedLink);
        return sendSuccess(c, {
            message: "Dilewatkan: koordinat tidak ditemukan",
            data: null,
        });
    }

    const ext = path.extname(data.mediaPath) || ".jpg";
    const fileName = `${coordinates.lat}_${coordinates.long}${ext}`;
    const relativeFilePath = path.join(data.name, fileName);
    const mediaUrl = appConfig.whatsappServiceUrl + `/${data.mediaPath}`;

    logger.info(
        `[${data.messageId}] Menyimpan file dari ${mediaUrl} ke ${relativeFilePath}`
    );

    const {fullPath} = await saveFile(mediaUrl, relativeFilePath);
    logger.info(`[${data.messageId}] File berhasil disimpan: ${fullPath}`);

    let exist = await GroupService.getByChatId(data.chatId);

    if (!exist) {
        exist = await GroupService.create({
            name: data.name,
            chatId: data.chatId,
        });
    }

    if (data.name !== exist.name) {
        console.log("tidak sama");
        await GroupService.updateById(exist.id, {name: data.name});
    }

    await CoordinateService.create(coordinates, fileName, exist.id);

    logger.info(
        `[${data.messageId}] Koordinat dan grup berhasil disimpan ke database`
    );

    const normalize = fullPath.replace(/\\/g, "/");
    const linkGambar = `https://odp.tridatafiber.com/${normalize}`;

    const text = `✅ Berhasil menyimpan lokasi dan gambar\n\n*Koordinat* : ${coordinates.lat}, ${coordinates.long}\n*Alamat* : ${coordinates.address}\n*UrlId* : ${coordinates.urlId}\n\n*Gambar* : ${linkGambar}\n\n====================`;
    await WhatsappService().message.text(text, data.msg.key.remoteJid!, data.msg);

    return sendSuccess(c, {
        message: "Success save",
        data,
    });
});

export default r_webhook;
