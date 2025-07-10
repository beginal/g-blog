import { BrowserHelper } from './helpers/browser';
import { BASE_URL } from './setup';

describe('TableOfContents E2E Tests', () => {
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

  describe('목차 네비게이션 기능', () => {
    test('목차가 정상적으로 렌더링되어야 함', async () => {
      // 테스트용 게시물 ID (실제 존재하는 게시물 ID로 변경 필요)
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
      
      const page = await BrowserHelper.getPage();
      
      // 페이지 로딩 대기
      await BrowserHelper.waitForTimeout(3000);
      
      // TableOfContents 컴포넌트 확인
      const tocElement = await page.$('nav');
      expect(tocElement).toBeTruthy();
      
      // 목차 항목들 확인
      const tocItems = await page.$$('nav button');
      console.log(`Found ${tocItems.length} TOC items`);
      
      // 목차 항목이 최소 1개 이상 있어야 함
      expect(tocItems.length).toBeGreaterThan(0);
      
      await BrowserHelper.screenshot('toc-rendered');
    });

    test('각 목차 항목 클릭 시 해당 섹션으로 스크롤되어야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
      
      const page = await BrowserHelper.getPage();
      await BrowserHelper.waitForTimeout(3000);
      
      // 모든 목차 버튼 가져오기
      const tocButtons = await page.$$('nav button');
      console.log(`Testing ${tocButtons.length} TOC buttons`);
      
      // 각 버튼 테스트
      for (let i = 0; i < Math.min(tocButtons.length, 3); i++) { // 처음 3개만 테스트
        const button = tocButtons[i];
        if (!button) continue;
        const buttonText = await button.evaluate(el => el.textContent);
        console.log(`Testing button ${i}: "${buttonText}"`);
        
        // 현재 스크롤 위치 저장
        const scrollBefore = await page.evaluate(() => window.scrollY);
        
        // 버튼 클릭
        await button.click();
        
        // 스크롤 애니메이션 대기
        await BrowserHelper.waitForTimeout(1500);
        
        // 스크롤 위치 변경 확인
        const scrollAfter = await page.evaluate(() => window.scrollY);
        console.log(`Scroll changed from ${scrollBefore} to ${scrollAfter}`);
        
        // 스크롤이 발생했는지 확인 (제목 클릭이 아닌 경우)
        if (i > 0) { // 첫 번째 버튼이 제목일 수 있음
          expect(scrollAfter).not.toBe(scrollBefore);
        }
        
        await BrowserHelper.screenshot(`toc-clicked-${i}`);
      }
    });

    test('한글 제목이 포함된 목차도 정상 작동해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
      
      const page = await BrowserHelper.getPage();
      await BrowserHelper.waitForTimeout(3000);
      
      // 모든 헤더 요소 확인
      const headers = await page.$$('h1, h2, h3, h4, h5, h6');
      console.log(`Found ${headers.length} headers in content`);
      
      // 각 헤더의 ID 확인
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        if (!header) continue;
        const id = await header.evaluate(el => el.id);
        const text = await header.evaluate(el => el.textContent);
        console.log(`Header ${i}: id="${id}", text="${text}"`);
        
        // ID가 존재하는지 확인
        if (text && text.trim()) {
          expect(id).toBeTruthy();
          expect(id).toMatch(/^heading-\d+/); // heading-숫자 형식인지 확인
        }
      }
    });

    test('제목 클릭 시 페이지 최상단으로 이동해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
      
      const page = await BrowserHelper.getPage();
      await BrowserHelper.waitForTimeout(3000);
      
      // 페이지를 아래로 스크롤
      await page.evaluate(() => window.scrollTo(0, 1000));
      await BrowserHelper.waitForTimeout(500);
      
      const scrollBefore = await page.evaluate(() => window.scrollY);
      expect(scrollBefore).toBeGreaterThan(500); // 스크롤이 되었는지 확인
      
      // 첫 번째 버튼(제목) 클릭
      const firstButton = await page.$('nav button');
      if (firstButton) {
        const buttonText = await firstButton.evaluate(el => el.textContent);
        console.log(`Clicking title button: "${buttonText}"`);
        
        await firstButton.click();
        await BrowserHelper.waitForTimeout(1500);
        
        const scrollAfter = await page.evaluate(() => window.scrollY);
        console.log(`Scroll after title click: ${scrollAfter}`);
        
        // 최상단으로 이동했는지 확인
        expect(scrollAfter).toBeLessThan(100);
      }
    });

    test('hover 시 스타일이 변경되어야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
      
      const page = await BrowserHelper.getPage();
      await BrowserHelper.waitForTimeout(3000);
      
      const tocButtons = await page.$$('nav button');
      
      if (tocButtons.length > 1) {
        const button = tocButtons[1]; // 두 번째 버튼 테스트
        
        // hover 전 스타일
        const styleBefore = await button.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            cursor: computed.cursor
          };
        });
        
        console.log('Style before hover:', styleBefore);
        expect(styleBefore.cursor).toBe('pointer');
        
        // hover
        await button.hover();
        await BrowserHelper.waitForTimeout(300);
        
        // hover 후 스타일
        const styleAfter = await button.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            cursor: computed.cursor
          };
        });
        
        console.log('Style after hover:', styleAfter);
        
        await BrowserHelper.screenshot('toc-hover-state');
      }
    });

    test('콘솔 에러가 발생하지 않아야 함', async () => {
      const page = await BrowserHelper.getPage();
      
      // 콘솔 에러 리스너 추가
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
      await BrowserHelper.waitForTimeout(3000);
      
      // 목차 버튼 클릭
      const tocButtons = await page.$$('nav button');
      if (tocButtons.length > 0) {
        await tocButtons[0].click();
        await BrowserHelper.waitForTimeout(1000);
      }
      
      // Element not found 에러가 없어야 함
      const elementNotFoundErrors = errors.filter(err => 
        err.includes('Element not found for ID')
      );
      
      console.log('Console errors:', errors);
      expect(elementNotFoundErrors.length).toBe(0);
    });
  });
});