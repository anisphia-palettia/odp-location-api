import {getBrowser} from "@/utils/browser-manager";
import type {Coordinates} from "@/types/whatsapp";
import type {Page} from "playwright";
import {logger} from "@/lib/logger";

export async function getCoordinatesFromPage(url: string): Promise<Coordinates | null> {
    const browser = await getBrowser();
    const page: Page = await browser.newPage();

    try {
        await page.goto(url, {waitUntil: 'networkidle'});
        await page.waitForSelector('.content .cardItem', {timeout: 10000});

        const addressText = await page.locator('.content .cardItem', {
            has: page.locator('.top', {hasText: 'Address'})
        }).locator('.bottom').textContent();

        if (!addressText) {
            return null
        }

        const gpsText = await page.locator('.content .cardItem', {
            has: page.locator('.top', {hasText: 'GPS'})
        }).locator('.bottom').textContent();


        if (gpsText) {
            const parts = gpsText.trim().split(',').map(v => v.trim());

            if (parts.length === 2 && parts[0] && parts[1]) {
                const [lat, lng] = parts;
                const urlParts = url.split('/');
                const urlId = urlParts[4];
                return {lat, long: lng, address: addressText, urlId};
            } else {
                logger.warn('Format GPS tidak valid:', gpsText);
                return null;
            }
        } else {
            logger.warn('gpsText kosong atau null');
            return null;
        }
    } catch (err) {
        logger.error('Error:', err);
        return null;
    } finally {
        await page.close();
    }
}