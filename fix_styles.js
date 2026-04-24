import fs from 'fs';
import path from 'path';

const source = 'style.css';
const target = path.join('src', 'styles', 'global.css');

try {
    const data = fs.readFileSync(source, 'utf8');
    fs.writeFileSync(target, data, 'utf8');
    console.log('Successfully copied style.css to src/styles/global.css');
} catch (err) {
    console.error('Error:', err);
}
