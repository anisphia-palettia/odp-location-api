import {getBrowser} from "@/utils/browser-manager.ts";
import type {Coordinates} from "@/types/whatsapp.ts";
import type {Page} from "playwright";

export async function getCoordinatesFromPage(url: string): Promise<Coordinates | null> {
    const browser = await getBrowser();
    const page: Page = await browser.newPage();

    try {
        await page.goto(url, {waitUntil: 'networkidle'});
        await page.waitForSelector('.content .cardItem', {timeout: 10000});

        const addressText = await page.locator('.content .cardItem', {
            has: page.locator('.top', {hasText: 'Address'})
        }).locator('.bottom').textContent();

        console.log('addressText', addressText)

        const gpsText = await page.locator('.content .cardItem', {
            has: page.locator('.top', {hasText: 'GPS'})
        }).locator('.bottom').textContent();


        if (gpsText) {
            const parts = gpsText.trim().split(',').map(v => v.trim());

            if (parts.length === 2 && parts[0] && parts[1]) {
                const [lat, lng] = parts;
                return {lat, long: lng};
            } else {
                console.warn('Format GPS tidak valid:', gpsText);
                return null;
            }
        } else {
            console.warn('gpsText kosong atau null');
            return null;
        }
    } catch (err) {
        console.error('Error:', err);
        return null;
    } finally {
        await page.close(); // hanya tutup tab
    }
}