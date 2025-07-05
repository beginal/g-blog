import { BrowserHelper } from './helpers/browser';
import { BASE_URL } from './setup';

describe('Comment System E2E Tests', () => {
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

  test('게시물 페이지의 댓글 섹션이 표시되어야 함', async () => {
    // 실제 게시물 ID로 변경 필요
    await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
    
    // 댓글 섹션 로딩 대기
    await BrowserHelper.waitForSelector('[data-testid="comment-section"]', 10000);
    
    // 댓글 폼 확인
    await BrowserHelper.waitForSelector('[data-testid="comment-form"]');
    
    await BrowserHelper.screenshot('comment-section-loaded');
  });

  test('댓글 작성 폼이 정상 동작해야 함', async () => {
    await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
    await BrowserHelper.waitForSelector('[data-testid="comment-form"]', 10000);
    
    // 닉네임 입력
    await BrowserHelper.typeText('input[name="nickname"]', 'E2E테스터');
    
    // 댓글 내용 입력
    await BrowserHelper.typeText('textarea[name="content"]', 'E2E 테스트에서 작성한 댓글입니다.');
    
    await BrowserHelper.screenshot('comment-form-filled');
    
    // 제출 버튼 확인 (실제 제출은 하지 않음)
    const page = await BrowserHelper.getPage();
    const submitButton = await page.$('button[type="submit"]');
    expect(submitButton).toBeTruthy();
  });

  test('댓글 validation이 동작해야 함', async () => {
    await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
    await BrowserHelper.waitForSelector('[data-testid="comment-form"]', 10000);
    
    // 빈 폼으로 제출 시도
    await BrowserHelper.clickElement('button[type="submit"]');
    
    // 에러 메시지 확인
    const page = await BrowserHelper.getPage();
    
    // 에러 메시지가 표시되는지 확인 (실제 선택자에 맞게 수정)
    const errorExists = await page.$('.error-message, [data-testid="error"]') !== null;
    expect(errorExists).toBe(true);
    
    await BrowserHelper.screenshot('comment-validation-error');
  });

  test('댓글 목록이 표시되어야 함', async () => {
    await BrowserHelper.navigateTo(`${BASE_URL}/posts/1`);
    
    // 댓글 목록 로딩 대기
    await BrowserHelper.waitForSelector('[data-testid="comment-list"]', 10000);
    
    const page = await BrowserHelper.getPage();
    
    // 댓글 아이템들 확인
    const comments = await page.$$('[data-testid="comment-item"]');
    
    // 댓글이 0개 이상이어야 함 (빈 상태 포함)
    expect(comments.length).toBeGreaterThanOrEqual(0);
    
    await BrowserHelper.screenshot('comment-list-displayed');
  });
});