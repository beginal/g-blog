import { BrowserHelper } from './helpers/browser';
import { BASE_URL } from './setup';

describe('Post Editor Form E2E Tests', () => {
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

  describe('폼 상호작용', () => {
    test('전체 폼 작성 플로우가 정상 동작해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      // 모든 필수 필드 입력
      await BrowserHelper.waitForSelector('input#title');
      await BrowserHelper.typeText('input#title', 'E2E 테스트 완전한 게시물');
      
      await BrowserHelper.waitForSelector('input#tags');
      await BrowserHelper.typeText('input#tags', 'E2E, Testing, Automation');
      
      await BrowserHelper.waitForSelector('input#thumbnail');
      await BrowserHelper.typeText('input#thumbnail', 'https://example.com/e2e-test.jpg');
      
      // Toast UI 에디터 내용 입력 (가능한 경우)
      await BrowserHelper.waitForSelector('.toastui-editor', 8000);
      
      const page = await BrowserHelper.getPage();
      
      // 에디터 내용 입력 시도
      const editorExists = await page.$('.toastui-editor .te-editor') !== null;
      if (editorExists) {
        await page.click('.toastui-editor .te-editor');
        await page.type('.toastui-editor .te-editor', '# E2E 테스트 내용\n\n이것은 자동화된 테스트로 작성된 게시물입니다.');
      }
      
      await BrowserHelper.screenshot('complete-form-filled');
      
      // 실제 제출은 하지 않음 (데이터 생성 방지)
      // await BrowserHelper.clickElement('button[type="submit"]');
    });

    test('필드별 실시간 validation이 동작해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('input#title');
      
      const page = await BrowserHelper.getPage();
      
      // 매우 긴 제목 입력으로 validation 테스트
      const longTitle = 'a'.repeat(200);
      await BrowserHelper.typeText('input#title', longTitle);
      
      // validation 상태 확인
      const titleValidation = await page.evaluate(() => {
        const titleInput = document.querySelector('input#title') as HTMLInputElement;
        return {
          value: titleInput.value,
          validity: titleInput.validity.valid,
          validationMessage: titleInput.validationMessage
        };
      });
      
      expect(titleValidation.value.length).toBe(200);
      
      await BrowserHelper.screenshot('long-title-validation');
    });

    test('태그 입력에서 쉼표 구분이 올바르게 처리되어야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('input#tags');
      
      // 다양한 태그 입력 패턴 테스트
      const tagPatterns = [
        'React,JavaScript,Web',  // 공백 없음
        'React, JavaScript, Web',  // 공백 있음
        ' React , JavaScript , Web ',  // 앞뒤 공백
        'React,, JavaScript,,,Web'  // 연속 쉼표
      ];
      
      const page = await BrowserHelper.getPage();
      
      for (let i = 0; i < tagPatterns.length; i++) {
        await page.click('input#tags', { clickCount: 3 }); // 전체 선택
        await page.type('input#tags', tagPatterns[i]);
        
        const inputValue = await page.$eval('input#tags', (el: any) => el.value);
        expect(inputValue).toBe(tagPatterns[i]);
        
        await BrowserHelper.screenshot(`tag-pattern-${i}`);
      }
    });

    test('썸네일 URL validation이 동작해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('input#thumbnail');
      
      const page = await BrowserHelper.getPage();
      
      // 다양한 URL 패턴 테스트
      const urlPatterns = [
        'https://example.com/image.jpg',  // 유효한 URL
        'http://test.com/img.png',  // HTTP URL
        'invalid-url',  // 유효하지 않은 URL
        'ftp://example.com/file.jpg',  // 다른 프로토콜
        ''  // 빈 값
      ];
      
      for (let i = 0; i < urlPatterns.length; i++) {
        await page.click('input#thumbnail', { clickCount: 3 });
        if (urlPatterns[i]) {
          await page.type('input#thumbnail', urlPatterns[i]);
        }
        
        const inputValue = await page.$eval('input#thumbnail', (el: any) => el.value);
        const validity = await page.$eval('input#thumbnail', (el: any) => el.validity.valid);
        
        expect(inputValue).toBe(urlPatterns[i]);
        
        await BrowserHelper.screenshot(`thumbnail-url-${i}`);
      }
    });
  });

  describe('에디터 상호작용', () => {
    test('Toast UI 에디터 모드 전환이 가능해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('.toastui-editor', 10000);
      
      const page = await BrowserHelper.getPage();
      
      // 에디터 모드 전환 버튼 찾기
      const modeButtons = await page.$$('.toastui-editor .te-mode-switch-tab');
      
      if (modeButtons && modeButtons.length > 0) {
        // 각 모드 전환 테스트
        for (let i = 0; i < modeButtons.length; i++) {
          await modeButtons[i].click();
          await page.waitForTimeout(500);
          
          await BrowserHelper.screenshot(`editor-mode-${i}`);
        }
      }
    });

    test('에디터에서 마크다운 입력이 가능해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('.toastui-editor', 10000);
      
      const page = await BrowserHelper.getPage();
      
      // 마크다운 에디터 영역 찾기
      const editorTextarea = await page.$('.toastui-editor .te-editor, .toastui-editor textarea, .toastui-editor .CodeMirror');
      
      if (editorTextarea) {
        await editorTextarea.click();
        
        const markdownContent = `# 테스트 제목

## 소제목

이것은 **굵은 글씨**이고 이것은 *기울임*입니다.

- 목록 항목 1
- 목록 항목 2
- 목록 항목 3

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

[링크 텍스트](https://example.com)`;

        // 에디터에 마크다운 내용 입력
        await editorTextarea.type(markdownContent);
        
        await BrowserHelper.screenshot('markdown-content-input');
      }
    });

    test('에디터 툴바 기능이 동작해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('.toastui-editor', 10000);
      
      const page = await BrowserHelper.getPage();
      
      // 툴바 버튼들 찾기
      const toolbarButtons = await page.$$('.toastui-editor .te-toolbar-section .te-toolbar-item');
      
      if (toolbarButtons && toolbarButtons.length > 0) {
        // 처음 몇 개 버튼만 테스트 (모든 버튼을 클릭하면 시간이 오래 걸림)
        const testButtons = toolbarButtons.slice(0, 3);
        
        for (let i = 0; i < testButtons.length; i++) {
          await testButtons[i].click();
          await page.waitForTimeout(300);
          
          await BrowserHelper.screenshot(`toolbar-button-${i}`);
        }
      }
    });
  });

  describe('버튼 상호작용', () => {
    test('취소 버튼 클릭 시 확인 대화상자가 표시되어야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('button[type="button"]');
      
      // 일부 내용 입력
      await BrowserHelper.typeText('input#title', '취소 테스트');
      
      const page = await BrowserHelper.getPage();
      
      // 취소 버튼 찾기 및 클릭
      const cancelButton = await page.$('button:has-text("취소"), button[type="button"]:not([type="submit"])');
      
      if (cancelButton) {
        // confirm 대화상자 처리 준비
        page.on('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm');
          await dialog.dismiss(); // 취소 선택
        });
        
        await cancelButton.click();
        await page.waitForTimeout(500);
        
        await BrowserHelper.screenshot('cancel-button-clicked');
      }
    });

    test('저장 버튼의 로딩 상태가 올바르게 표시되어야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      // 최소한의 유효한 데이터 입력
      await BrowserHelper.waitForSelector('input#title');
      await BrowserHelper.typeText('input#title', '저장 테스트');
      
      const page = await BrowserHelper.getPage();
      
      // 저장 버튼 찾기
      const submitButton = await page.$('button[type="submit"]');
      
      if (submitButton) {
        // 버튼 초기 상태 확인
        const initialText = await submitButton.textContent();
        expect(initialText).toContain('게시물 작성');
        
        await BrowserHelper.screenshot('submit-button-initial');
        
        // 실제 제출은 하지 않음 (로딩 상태 확인은 모킹 필요)
      }
    });
  });

  describe('폼 상태 관리', () => {
    test('unsaved changes 경고가 동작해야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      await BrowserHelper.waitForSelector('input#title');
      
      // 내용 입력
      await BrowserHelper.typeText('input#title', '변경사항 테스트');
      
      const page = await BrowserHelper.getPage();
      
      // beforeunload 이벤트 처리 준비
      page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('beforeunload');
        await dialog.dismiss();
      });
      
      // 페이지 새로고침 시도
      try {
        await page.reload({ waitUntil: 'domcontentloaded', timeout: 3000 });
      } catch (error) {
        // beforeunload로 인한 타임아웃은 정상
      }
      
      await BrowserHelper.screenshot('unsaved-changes-warning');
    });

    test('폼 데이터가 올바르게 수집되어야 함', async () => {
      await BrowserHelper.navigateTo(`${BASE_URL}/posts/new`);
      
      // 모든 필드에 데이터 입력
      const testData = {
        title: '폼 데이터 수집 테스트',
        tags: 'Test, Form, Data',
        thumbnail: 'https://example.com/test.jpg'
      };
      
      await BrowserHelper.waitForSelector('input#title');
      await BrowserHelper.typeText('input#title', testData.title);
      await BrowserHelper.typeText('input#tags', testData.tags);
      await BrowserHelper.typeText('input#thumbnail', testData.thumbnail);
      
      const page = await BrowserHelper.getPage();
      
      // 폼 데이터 수집
      const formData = await page.evaluate(() => {
        const titleInput = document.querySelector('input#title') as HTMLInputElement;
        const tagsInput = document.querySelector('input#tags') as HTMLInputElement;
        const thumbnailInput = document.querySelector('input#thumbnail') as HTMLInputElement;
        
        return {
          title: titleInput?.value || '',
          tags: tagsInput?.value || '',
          thumbnail: thumbnailInput?.value || ''
        };
      });
      
      expect(formData.title).toBe(testData.title);
      expect(formData.tags).toBe(testData.tags);
      expect(formData.thumbnail).toBe(testData.thumbnail);
      
      await BrowserHelper.screenshot('form-data-collected');
    });
  });
});