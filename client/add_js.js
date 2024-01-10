import * as fs from 'fs';

const filePaths = ['public/scripts/js/Board.js', 'public/scripts/js/Game.js',
                    'public/scripts/js/helper.js', 'public/scripts/js/setup.js',
                    'public/scripts/js/utility.js']


filePaths.forEach(filePath => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      
        // Use regex to replace the import statement
        const updatedData = data.replace(/import\s*\{([\s\S]*?)\}\s*from\s*["'](\.[^"']*?)["']\s*;/g, 'import { $1 } from "$2.js";');
      
        // Write the updated content back to the file
        fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
            return;
          }
          console.log('Import statement replaced successfully.');
        });
      });
});

