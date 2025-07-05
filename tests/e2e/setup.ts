import { Browser, Page } from 'puppeteer';

declare global {
  var browser: Browser;
  var page: Page;
}

// E2E 테스트 전역 설정
const HEADLESS = process.env.HEADLESS !== 'false';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// 타임아웃 설정
jest.setTimeout(30000);

export { BASE_URL, HEADLESS };