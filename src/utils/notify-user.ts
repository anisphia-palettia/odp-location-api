import WhatsappService from "@/service/whatsapp-service";
import type {IWhatsappWebhookMessage} from "@/types/whatsapp";

export async function notifyUser(message: string, data: IWhatsappWebhookMessage) {
    try {
        await WhatsappService().message.text(message, data.msg.key.remoteJid!, data.msg);
    } catch (error) {
        console.error("Gagal mengirim pesan ke pengguna:", error);
    }
}
