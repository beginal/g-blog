import { BrowserHelper } from './helpers/browser';
import { BASE_URL } from './setup';

describe('Homepage E2E Tests', () => {
  beforeAll(async () => {
    await BrowserHelper.getBrowser();
  });

  afterAll(async () => {
    await BrowserHelper.closeBrowser();
  });

  beforeEach(async () => {
    await BrowserHelper.getPage();
  });

  afterEach(async () => {
    await BrowserHelper.closePage();
  });

  test('홈페이지가 정상적으로 로드되어야 함', async () => {
    await BrowserHelper.navigateTo(BASE_URL);
    
    // 페이지 제목 확인
    const page = await BrowserHelper.getPage();
    const title = await page.title();
    expect(title).toBeTruthy();
    
    // 스크린샷 캡처
    await BrowserHelper.screenshot('homepage-load');
  });

  test('네비게이션 메뉴가 표시되어야 함', async () => {
    await BrowserHelper.navigateTo(BASE_URL);
    
    // 네비게이션 요소 확인 (실제 선택자에 맞게 수정 필요)
    await BrowserHelper.waitForSelector('nav', 5000);
    
    const page = await BrowserHelper.getPage();
    const navExists = await page.$('nav') !== null;
    expect(navExists).toBe(true);
  });

  test('반응형 디자인이 동작해야 함', async () => {
    const page = await BrowserHelper.getPage();
    
    // 데스크톱 크기
    await page.setViewport({ width: 1280, height: 720 });
    await BrowserHelper.navigateTo(BASE_URL);
    await BrowserHelper.screenshot('homepage-desktop');
    
    // 모바일 크기
    await page.setViewport({ width: 375, height: 667 });
    await page.reload({ waitUntil: 'networkidle0' });
    await BrowserHelper.screenshot('homepage-mobile');
    
    // 페이지가 여전히 로드되어 있는지 확인
    const title = await page.title();
    expect(title).toBeTruthy();
  });
});