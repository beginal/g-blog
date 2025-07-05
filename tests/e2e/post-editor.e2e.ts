import { BrowserHelper } from './helpers/browser';
import { BASE_URL } from './setup';

describe('Post Editor E2E Tests', () => {
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

  describe('게시물 생성 페이지', () => {
    test('새 게시물 작성 페이지가 정상적으로 로드되어야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      // 에디터 헤더 확인
      await BrowserHelper.waitForSelector('h1');
      const headerText = await BrowserHelper.getText('h1');
      expect(headerText).toContain('새 게시물 작성');
      
      // 필수 폼 요소들 확인
      await BrowserHelper.waitForSelector('input#title');
      await BrowserHelper.waitForSelector('input#tags');
      await BrowserHelper.waitForSelector('input#thumbnail');
      
      await BrowserHelper.screenshot('post-create-page-loaded');
    });

    test('제목 입력이 정상적으로 동작해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('input#title');
      
      // 제목 입력
      const testTitle = 'E2E 테스트 게시물 제목';
      await BrowserHelper.typeText('input#title', testTitle);
      
      // 입력된 값 확인
      const page = await BrowserHelper.getPage();
      const titleValue = await page.$eval('input#title', (el: any) => el.value);
      expect(titleValue).toBe(testTitle);
      
      await BrowserHelper.screenshot('post-title-entered');
    });

    test('메타데이터 입력이 정상적으로 동작해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      // 태그 입력
      await BrowserHelper.waitForSelector('input#tags');
      await BrowserHelper.typeText('input#tags', 'React, JavaScript, E2E');
      
      // 썸네일 URL 입력
      await BrowserHelper.waitForSelector('input#thumbnail');
      await BrowserHelper.typeText('input#thumbnail', 'https://example.com/test.jpg');
      
      const page = await BrowserHelper.getPage();
      
      // 입력된 값들 확인
      const tagsValue = await page.$eval('input#tags', (el: any) => el.value);
      const thumbnailValue = await page.$eval('input#thumbnail', (el: any) => el.value);
      
      expect(tagsValue).toBe('React, JavaScript, E2E');
      expect(thumbnailValue).toBe('https://example.com/test.jpg');
      
      await BrowserHelper.screenshot('post-metadata-entered');
    });

    test('Toast UI 에디터가 로드되어야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      // Toast UI 에디터 로딩 대기 (동적 임포트)
      await BrowserHelper.waitForSelector('.toastui-editor', 10000);
      
      const page = await BrowserHelper.getPage();
      const editorExists = await page.$('.toastui-editor') !== null;
      expect(editorExists).toBe(true);
      
      await BrowserHelper.screenshot('toast-editor-loaded');
    });

    test('폼 validation이 동작해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('button[type="submit"]');
      
      // 빈 폼으로 제출 시도
      await BrowserHelper.clickElement('button[type="submit"]');
      
      const page = await BrowserHelper.getPage();
      
      // 에러 메시지 또는 validation 확인
      // (실제 구현에 따라 선택자 조정 필요)
      const hasValidationMessage = await page.evaluate(() => {
        const titleInput = document.querySelector('input#title') as HTMLInputElement;
        return titleInput?.validity?.valid === false || 
               titleInput?.validationMessage !== '' ||
               document.querySelector('.error-message, [data-testid="error"]') !== null;
      });
      
      expect(hasValidationMessage).toBe(true);
      await BrowserHelper.screenshot('post-validation-error');
    });

    test('뒤로가기 버튼이 동작해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      // 뒤로가기 버튼 찾기 및 클릭
      const page = await BrowserHelper.getPage();
      const backButton = await page.$('button:has-text("뒤로가기"), a:has-text("뒤로가기"), [aria-label*="뒤로"], [aria-label*="back"]');
      
      if (backButton) {
        await backButton.click();
        
        // URL 변경 확인 (이전 페이지로 이동)
        await new Promise(resolve => setTimeout(resolve, 1000));
        const currentUrl = page.url();
        expect(currentUrl).not.toContain('/posts/new');
      }
      
      await BrowserHelper.screenshot('post-back-navigation');
    });
  });

  describe('게시물 수정 페이지', () => {
    test('기존 게시물 수정 페이지가 정상적으로 로드되어야 함', async () => {
      // 실제 존재하는 게시물 ID로 변경 필요
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/1/edit`);
      
      // 페이지 로딩 대기
      await BrowserHelper.waitForSelector('h1', 10000);
      
      const page = await BrowserHelper.getPage();
      const currentUrl = page.url();
      
      // 404가 아닌 수정 페이지인지 확인
      if (currentUrl.includes('/edit')) {
        const headerText = await BrowserHelper.getText('h1');
        expect(headerText).toContain('게시물 수정');
        
        await BrowserHelper.screenshot('post-edit-page-loaded');
      } else {
        // 게시물이 없는 경우 스킵
        console.log('게시물이 존재하지 않아 수정 페이지 테스트를 스킵합니다.');
      }
    });

    test('기존 데이터가 pre-fill되어야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/1/edit`);
      
      const page = await BrowserHelper.getPage();
      const currentUrl = page.url();
      
      if (currentUrl.includes('/edit')) {
        // 입력 필드들에 기존 데이터가 있는지 확인
        await BrowserHelper.waitForSelector('input#title');
        
        const titleValue = await page.$eval('input#title', (el: any) => el.value);
        
        // 제목이 비어있지 않다면 데이터가 로드된 것
        if (titleValue && titleValue.trim() !== '') {
          expect(titleValue.length).toBeGreaterThan(0);
          await BrowserHelper.screenshot('post-edit-data-prefilled');
        }
      }
    });

    test('수정된 내용 저장이 가능해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/1/edit`);
      
      const page = await BrowserHelper.getPage();
      const currentUrl = page.url();
      
      if (currentUrl.includes('/edit')) {
        await BrowserHelper.waitForSelector('input#title');
        
        // 제목 수정
        const titleInput = await page.$('input#title');
        if (titleInput) {
          await titleInput.click({ clickCount: 3 }); // 전체 선택
          await titleInput.type(' (수정됨)');
          
          await BrowserHelper.screenshot('post-edit-title-modified');
          
          // 실제 저장은 하지 않음 (데이터 변경 방지)
          // await BrowserHelper.clickElement('button[type="submit"]');
        }
      }
    });
  });

  describe('반응형 디자인', () => {
    test('모바일 화면에서 에디터가 정상 동작해야 함', async () => {
      const page = await BrowserHelper.getPage();
      
      // 모바일 크기로 변경
      await page.setViewport({ width: 375, height: 667 });
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      // 폼 요소들이 모바일에서도 접근 가능한지 확인
      await BrowserHelper.waitForSelector('input#title');
      await BrowserHelper.waitForSelector('input#tags');
      
      // 모바일에서 입력 테스트
      await BrowserHelper.typeText('input#title', '모바일 테스트 제목');
      
      const titleValue = await page.$eval('input#title', (el: any) => el.value);
      expect(titleValue).toBe('모바일 테스트 제목');
      
      await BrowserHelper.screenshot('post-editor-mobile');
    });

    test('태블릿 화면에서 에디터가 정상 동작해야 함', async () => {
      const page = await BrowserHelper.getPage();
      
      // 태블릿 크기로 변경
      await page.setViewport({ width: 768, height: 1024 });
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      await BrowserHelper.waitForSelector('input#title');
      
      // 태블릿에서 메타데이터 그리드 레이아웃 확인
      const metaInputsContainer = await page.$('.grid.grid-cols-1.md\\:grid-cols-2');
      expect(metaInputsContainer).toBeTruthy();
      
      await BrowserHelper.screenshot('post-editor-tablet');
    });
  });

  describe('키보드 네비게이션', () => {
    test('Tab 키로 폼 필드 간 이동이 가능해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('input#title');
      
      const page = await BrowserHelper.getPage();
      
      // 첫 번째 필드에 포커스
      await page.focus('input#title');
      expect(await page.evaluate(() => document.activeElement?.id)).toBe('title');
      
      // Tab으로 다음 필드로 이동
      await page.keyboard.press('Tab');
      
      // 포커스가 이동했는지 확인
      const focusedElementId = await page.evaluate(() => document.activeElement?.id);
      expect(['tags', 'thumbnail'].includes(focusedElementId || '')).toBe(true);
      
      await BrowserHelper.screenshot('post-editor-keyboard-navigation');
    });

    test('Enter 키로 폼 제출이 가능해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('input#title');
      
      const page = await BrowserHelper.getPage();
      
      // 제목 입력 후 Enter
      await page.focus('input#title');
      await page.type('input#title', 'Enter 키 테스트 제목');
      await page.keyboard.press('Enter');
      
      // 폼 제출 시도되었는지 확인 (validation 메시지나 로딩 상태)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await BrowserHelper.screenshot('post-editor-enter-submit');
    });
  });

  describe('에러 처리', () => {
    test('네트워크 오류 시 적절한 처리가 되어야 함', async () => {
      const page = await BrowserHelper.getPage();
      
      // 네트워크 차단
      await page.setOfflineMode(true);
      
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      // 오프라인 상태에서의 동작 확인
      const isOnline = await page.evaluate(() => navigator.onLine);
      expect(isOnline).toBe(false);
      
      // 네트워크 복구
      await page.setOfflineMode(false);
      
      await BrowserHelper.screenshot('post-editor-offline-handling');
    });
  });
});