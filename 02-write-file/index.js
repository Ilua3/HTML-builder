const fileSystem = require('fs');
const filePathModule = require('path');
const readLineModule = require('readline');

const textFilePath = filePathModule.join(__dirname, 'output.txt');

fileSystem.open(textFilePath, 'a', (error, fileDescriptor) => {
  if (error) {
    console.error('Ошибка при создании файла:', error);
    return;
  }
  fileSystem.close(fileDescriptor, (closeError) => {
    if (closeError) console.error('Ошибка при закрытии файла:', closeError);
  });
});

const textWriteStream = fileSystem.createWriteStream(textFilePath, { flags: 'a' });

const readLineInterface = readLineModule.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Введите текст для записи в файл. Для выхода нажмите Ctrl+C или введите "exit".');

readLineInterface.on('line', (userInput) => {
  if (userInput.trim().toLowerCase() === 'exit') {
    readLineInterface.close();
  } else {
    textWriteStream.write(`${userInput}\n`);
  }
});

readLineInterface.on('close', () => {
  textWriteStream.end();
  process.exit(0);
});

readLineInterface.on('SIGINT', () => {
  readLineInterface.close();
});

