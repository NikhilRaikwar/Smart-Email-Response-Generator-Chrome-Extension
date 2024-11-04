import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Build the project
console.log('Building project...');
exec('npm run build', (error) => {
  if (error) {
    console.error('Build failed:', error);
    return;
  }

  // Copy manifest and icons to dist
  console.log('Copying extension files...');
  fs.copyFileSync('manifest.json', 'dist/manifest.json');
  
  // Create icons directory
  if (!fs.existsSync('dist/icons')) {
    fs.mkdirSync('dist/icons');
  }

  // Copy icons
  const iconSizes = ['16', '48', '128'];
  iconSizes.forEach(size => {
    fs.copyFileSync(
      `public/icons/icon${size}.png`,
      `dist/icons/icon${size}.png`
    );
  });

  console.log('Extension built successfully!');
});