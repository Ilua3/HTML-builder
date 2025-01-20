const fileSystem = require('fs');
const filePathModule = require('path');
const textFilePath = filePathModule.join(__dirname, 'text.txt');
const fileReadStream = fileSystem.createReadStream(textFilePath, 'utf8');
fileReadStream.pipe(process.stdout);
fileReadStream.on('error', (error) => {
  console.error('Ошибка при чтении файла:', error);
});
