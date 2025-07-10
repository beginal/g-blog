const https = require('https');
const fs = require('fs');
const path = require('path');

const iconData = {
  "JavaScript": {
    "src": "https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/Javascript-MpKcuqKobxaQkAaZf03pqCuY5wZWia.png"
  },
  "Next.js": {
    "src": "https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/Next.js-AhWeuPpDe5INDWIBXqSbbsxoV0OvzS.png"
  },
  "TypeScript": {
    "src": "https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/typescript-50YJFG5dzDLgPyvDvGxy6XZ6oMqjKi.png"
  },
  "Tailwind CSS": {
    "src": "https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/tailwind-css-Ac4YsB1L03P1CGQqjaJlIYKcWjAxtf.png"
  },
  "Photoshop": {
    "src": "https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/Photoshop-Obia0MwpqOabokIzsqb2vErqePfFpd.png"
  },
  "Figma": {
    "src": "https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/figma-IiFO7yrdgnjBSjpxsCokIusUg6AoGO.png"
  }
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // 실패시 파일 삭제
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllIcons() {
  const publicDir = path.join(__dirname, '..', 'public', 'icons');
  
  // 디렉토리가 없으면 생성
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  for (const [techName, iconInfo] of Object.entries(iconData)) {
    try {
      const filename = `${techName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
      const filepath = path.join(publicDir, filename);
      
      await downloadImage(iconInfo.src, filepath);
    } catch (error) {
      console.error(`Error downloading ${techName}:`, error.message);
    }
  }
  
  console.log('All downloads completed!');
}

downloadAllIcons();