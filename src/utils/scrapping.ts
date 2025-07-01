import puppeteer from 'puppeteer';
import type { Coordinates } from "@/types/whatsapp.ts";

export async function getCoordinatesFromTimemark(url: string): Promise<Coordinates | null> {
    console.log(`[puppeteer] 🟡 getCoordinatesFromTimemark DIPANGGIL untuk: ${url}`);

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log('[puppeteer] ✅ newPage dibuka');

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        console.log('[puppeteer] 🌐 Halaman dimuat');

        await page.waitForSelector('.cardItem', { timeout: 10000 });
        console.log('[puppeteer] 🎯 .cardItem ditemukan');

        return await page.evaluate(() => {
            const item = document.querySelector('.cardItem');
            const label = item?.querySelector('.top')?.textContent?.trim();
            const value = item?.querySelector('.bottom')?.textContent?.trim();
            if (label === 'GPS' && value) {
                const [lat, long] = value.split(',').map((v) => v.trim());
                if (lat && long) {
                    return { lat, long };
                }
            }
            return null;
        });
    } catch (err) {
        console.error('[puppeteer] ❌ ERROR:', err);
        return null;
    } finally {
        await page.close();
        await browser.close();
        console.log('[puppeteer] 🔒 Tab dan browser ditutup');
    }
}