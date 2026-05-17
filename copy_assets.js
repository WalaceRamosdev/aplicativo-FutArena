const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\1f303348-69ae-4319-bca7-88c21cfaa295\\futarena_app_icon_1778970626331.png';
const assetsDir = path.join(__dirname, 'futarena-rn', 'src', 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log('Created assets directory');
}

const targets = ['icon.png', 'adaptive-icon.png', 'favicon.png', 'splash.png'];

targets.forEach(target => {
  const dest = path.join(assetsDir, target);
  fs.copyFileSync(srcPath, dest);
  console.log(`Copied asset to ${target}`);
});

console.log('All branding assets copied successfully!');
