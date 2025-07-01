import puppeteer, { Browser, Page } from 'puppeteer';
import pLimit from 'p-limit';
import pRetry from 'p-retry';

let browser: Browser | null = null;
const pageLimit = pLimit(3); // max 3 tab aktif sekaligus

export async function getBrowser(): Promise<Browser> {
    if (!browser) {
        browser = await puppeteer.launch({ headless: false });
        console.log('[puppeteer] Browser launched.');
    }
    return browser;
}

export async function withPuppeteerPage<T>(fn: (page: Page) => Promise<T>): Promise<T> {
    return pageLimit(async () => {
        const browser = await getBrowser();
        const page = await browser.newPage();
        console.log(`[puppeteer] Tab dimulai | Aktif: ${pageLimit.activeCount} | Pending: ${pageLimit.pendingCount}`);

        try {
            const result = await fn(page);
            return result;
        } catch (err) {
            console.error('[puppeteer] Error in page function:', (err as Error).message);
            throw err;
        } finally {
            await page.close();
            console.log(`[puppeteer] Tab selesai | Aktif: ${pageLimit.activeCount}`);
        }
    });
}

export async function retryWithPuppeteer<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
    return pRetry(fn, {
        retries,
        onFailedAttempt: (error) => {
            console.warn(`[puppeteer] Retry #${error.attemptNumber} failed: ${error.message}`);
        },
    });
}

export async function closeBrowser() {
    if (browser) {
        await browser.close();
        browser = null;
        console.log('[puppeteer] Browser closed.');
    }
}
