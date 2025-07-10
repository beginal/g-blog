const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function scrapeIcons() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.meganmagic.com/#top');
    await page.waitForTimeout(3000);
    
    // 스킬 섹션 찾기
    const skillSection = await page.locator('//*[@id="skill"]/div/div/div').first();
    await skillSection.waitFor();
    
    // 각 스킬 아이템 가져오기
    const skillItems = await page.locator('//*[@id="skill"]/div/div/div//p').all();
    
    const iconData = {};
    
    for (let i = 0; i < skillItems.length; i++) {
      const item = skillItems[i];
      const text = await item.textContent();
      
      if (text) {
        const skillName = text.trim().toLowerCase();
        
        // 이미지 요소 찾기 (p 태그의 형제나 부모에서)
        const parent = await item.locator('..').first();
        const imgElement = await parent.locator('img').first();
        
        if (await imgElement.count() > 0) {
          const src = await imgElement.getAttribute('src');
          const alt = await imgElement.getAttribute('alt');
          
          console.log(`Found: ${skillName} - ${src}`);
          
          // 매핑할 기술들
          const mapping = {
            'javascript': 'JavaScript',
            'react': 'React',
            'next.js': 'Next.js',
            'typescript': 'TypeScript',
            'html': 'HTML5',
            'css': 'CSS3',
            'scss': 'SCSS',
            'tailwind': 'Tailwind CSS',
            'tailwind css': 'Tailwind CSS',
            'node.js': 'Node.js',
            'git': 'Git',
            'github': 'GitHub',
            'figma': 'Figma',
            'photoshop': 'Photoshop',
            'firebase': 'Firebase',
            'vercel': 'Vercel',
            'aws': 'AWS',
            'python': 'Python'
          };
          
          if (mapping[skillName]) {
            iconData[mapping[skillName]] = {
              src: src,
              alt: alt || skillName
            };
          }
        }
      }
    }
    
    // 결과를 JSON 파일로 저장
    const outputPath = path.join(__dirname, 'scraped-icons.json');
    fs.writeFileSync(outputPath, JSON.stringify(iconData, null, 2));
    
    console.log('Icons scraped successfully!');
    console.log('Found icons for:', Object.keys(iconData));
    
    return iconData;
    
  } catch (error) {
    console.error('Error scraping icons:', error);
  } finally {
    await browser.close();
  }
}

// 실행
scrapeIcons();