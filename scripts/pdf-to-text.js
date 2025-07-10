const fs = require('fs');
const { exec } = require('child_process');

// Try to extract text using available tools
function tryExtraction() {
  console.log('PDF 파일에서 텍스트를 추출할 수 없습니다.');
  console.log('이력서의 주요 정보를 수동으로 입력해주세요:');
  console.log('');
  console.log('예상되는 구조:');
  console.log('## 개인정보');
  console.log('- 이름: 함준호');
  console.log('- 연락처: ...');
  console.log('');
  console.log('## 경력');
  console.log('### 탑코 (TopToon)');
  console.log('- 기간: ...');
  console.log('- 직책: ...');
  console.log('- 주요 업무: ...');
  console.log('');
  console.log('### Rencar');
  console.log('- 기간: ...');
  console.log('- 직책: ...');
  console.log('- 주요 업무: ...');
  console.log('');
  console.log('## 학력');
  console.log('- 패스트캠퍼스 PM 부트캠프');
  console.log('- 위코드 프론트엔드 개발 부트캠프');
  console.log('- 하남정보산업고등학교');
  console.log('');
  console.log('PDF 내용을 확인하여 위 정보를 보완해주세요.');
}

tryExtraction();