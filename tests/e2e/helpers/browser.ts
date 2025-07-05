import puppeteer, { Browser, Page } from 'puppeteer';
import { HEADLESS } from '../setup';

export class BrowserHelper {
  private static browser: Browser | null = null;
  private static page: Page | null = null;

  static async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: HEADLESS,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--window-size=1280,720'
        ],
        defaultViewport: {
          width: 1280,
          height: 720
        }
      });
    }
    return this.browser;
  }

  static async getPage(): Promise<Page> {
    if (!this.page) {
      const browser = await this.getBrowser();
      this.page = await browser.newPage();
      
      // 콘솔 로그 캡처
      this.page.on('console', (msg) => {
        if (msg.type() === 'error') {
          console.error('Page Error:', msg.text());
        }
      });

      // 네트워크 요청 실패 캡처
      this.page.on('requestfailed', (request) => {
        console.error('Request Failed:', request.url(), request.failure()?.errorText);
      });
    }
    return this.page;
  }

  static async closePage(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
  }

  static async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  static async navigateTo(url: string): Promise<void> {
    const page = await this.getPage();
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 15000 
    });
  }

  static async waitForSelector(selector: string, timeout = 5000): Promise<void> {
    const page = await this.getPage();
    await page.waitForSelector(selector, { timeout });
  }

  static async clickElement(selector: string): Promise<void> {
    const page = await this.getPage();
    await page.click(selector);
  }

  static async typeText(selector: string, text: string): Promise<void> {
    const page = await this.getPage();
    await page.type(selector, text);
  }

  static async getText(selector: string): Promise<string> {
    const page = await this.getPage();
    return await page.$eval(selector, (el) => el.textContent || '');
  }

  static async screenshot(name: string): Promise<void> {
    const page = await this.getPage();
    await page.screenshot({ 
      path: `tests/e2e/screenshots/${name}.png`,
      fullPage: true 
    });
  }
}