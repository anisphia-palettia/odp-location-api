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
        logger.warn(`[${data.messageId}] Dilewatkan - tidak ada teks`);
        return sendSuccess(c, {
            message: "Dilewatkan: tidak ada teks",
            data: null,
        });
    }

    const match = data.text.match(/(?:Lokasi|Location)\s*(?:dan|and|&)\s*(?:Verifikasi|Verification)[:：]?[^\n]*/i);
    if (!match) {
        logger.warn(`[${data.messageId}] Dilewatkan - tidak mengandung 'Lokasi dan Verifikasi'`);
        return sendSuccess(c, {
            message: "Dilewatkan: tidak mengandung 'Lokasi dan Verifikasi'",
            data: null,
        });
    }

    const lines = data.text.split("\n");
    const rawLink = lines[1]?.trim();
    const normalizedLink = rawLink?.startsWith("http") ? rawLink : `https://${rawLink}`;


    if (!normalizedLink) {
        logger.warn(`[${data.messageId}] Dilewatkan - link tidak valid`);
        return sendSuccess(c, {
            message: "Dilewatkan: link tidak valid",
            data: null,
        });
    }

    logger.info(`[${data.messageId}] Link ditemukan: ${normalizedLink}`);

    try {
        const allowedHosts = ["Timemark.com", "tridatafiber.com"];
        const urlHost = new URL(normalizedLink).host;
        if (!allowedHosts.some(h => urlHost.includes(h))) {
            logger.warn(`[${data.messageId}] Host tidak diizinkan: ${urlHost}`);
            return sendSuccess(c, {
                message: "Dilewatkan: domain tidak diizinkan",
                data: null,
            });
        }
    } catch (err) {
        logger.error(`[${data.messageId}] Error parsing URL: ${err}`);
        return sendSuccess(c, {
            message: "Dilewatkan: URL tidak valid",
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

    let coordinates;

    try {
        coordinates = await getCoordinatesFromPage(normalizedLink);
    } catch (err) {
        logger.error(`[${data.messageId}] Gagal scrapping halaman: ${err}`);
        await WhatsappService().message.text(
            `Terjadi error saat mengambil koordinat dari halaman\n${normalizedLink}`,
            data.msg.key.remoteJid!,
            data.msg
        );
        return sendSuccess(c, {
            message: "Error: gagal mengambil koordinat dari halaman",
            data: null,
        });
    }

    if (!coordinates?.lat || !coordinates?.long) {
        logger.warn(`[${data.messageId}] Koordinat tidak ditemukan`);
        await WhatsappService().message.text(
            `Koordinat tidak ditemukan di halaman\n${normalizedLink}`,
            data.msg.key.remoteJid!,
            data.msg
        );

        const existingGroup = await GroupService.getByChatId(data.chatId);
        await ErrorService.create(normalizedLink, existingGroup?.id ?? 0);

        return sendSuccess(c, {
            message: "Dilewatkan: koordinat tidak ditemukan",
            data: null,
        });
    }
    const ext = path.extname(data.mediaPath) || ".jpg";
    const fileName = `${coordinates.lat}_${coordinates.long}${ext}`;
    const relativeFilePath = path.join(data.name, fileName);
    const mediaUrl = appConfig.whatsappServiceUrl + `/${data.mediaPath}`;

    logger.info(`[${data.messageId}] Menyimpan file dari ${mediaUrl} ke ${relativeFilePath}`);
    const {fullPath} = await saveFile(mediaUrl, relativeFilePath);
    logger.info(`[${data.messageId}] File berhasil disimpan: ${fullPath}`);

    let group = await GroupService.getByChatId(data.chatId);
    if (!group) {
        group = await GroupService.create({
            name: data.name,
            chatId: data.chatId,
        });
    } else if (group.name !== data.name) {
        logger.info(`[${data.messageId}] Nama grup diperbarui dari ${group.name} ke ${data.name}`);
        await GroupService.updateById(group.id, {name: data.name});
    }

    await CoordinateService.create(coordinates, fileName, group.id);

    const normalizePath = fullPath.replace(/\\/g, "/");
    const imageUrl = `https://odp.tridatafiber.com/${normalizePath}`;

    const responseText = `✅ Berhasil menyimpan lokasi dan gambar\n\n*Koordinat* : ${coordinates.lat}, ${coordinates.long}\n*Alamat* : ${coordinates.address}\n*UrlId* : ${coordinates.urlId}\n\n*Gambar* : ${imageUrl}\n\n====================`;

    await WhatsappService().message.text(responseText, data.msg.key.remoteJid!, data.msg);

    return sendSuccess(c, {
        message: "Success save",
        data,
    });
});

export default r_webhook;
