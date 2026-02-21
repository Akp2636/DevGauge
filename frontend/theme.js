const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath, callback);
        } else {
            callback(fullPath);
        }
    });
}

walk('./src', (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace theme colors mapped to Green/Dark Leetcode aesthetic
        content = content.replace(/blue-/g, 'green-');
        content = content.replace(/violet-/g, 'emerald-');
        content = content.replace(/bg-\[#0f172a\]/g, 'bg-[#0a0a0a]'); // Ultra dark background
        content = content.replace(/slate-/g, 'neutral-'); // Neutral greys

        // Additional tweaks for globals.css variables
        content = content.replace(/--primary: #3b82f6; \/\* Blue 500 \*\//, '--primary: #22c55e; /* Green 500 */');
        content = content.replace(/--accent: #8b5cf6; \/\* Violet 500 \*\//, '--accent: #10b981; /* Emerald 500 */');
        content = content.replace(/--background: #0f172a; \/\* Slate 900 \*\//, '--background: #0a0a0a; /* Ultra Dark */');
        content = content.replace(/rgba\(30, 41, 59, 0\.7\)/g, 'rgba(20, 20, 20, 0.7)');

        fs.writeFileSync(filePath, content);
        console.log(`Updated theme in ${filePath}`);
    }
});
