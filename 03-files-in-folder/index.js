const fileSystem = require('fs/promises');
const filePathModule = require('path');

const directoryPath = filePathModule.join(__dirname, 'secret-folder');

async function showFilesInfo() {
  try {
    const directoryFiles = await fileSystem.readdir(directoryPath, { withFileTypes: true });

    for (const directoryFile of directoryFiles) {
      if (directoryFile.isFile()) {
        const directoryFilePath = filePathModule.join(directoryPath, directoryFile.name);
        const directoryFileStats = await fileSystem.stat(directoryFilePath);
        const directoryFileSize = (directoryFileStats.size / 1024).toFixed(3);
        const directoryFileExtension = filePathModule.extname(directoryFile.name).slice(1);
        const directoryFileName = filePathModule.basename(directoryFile.name, filePathModule.extname(directoryFile.name));

        console.log(`${directoryFileName} - ${directoryFileExtension} - ${directoryFileSize}kb`);
      }
    }
  } catch (error) {
    console.error('Ошибка при чтении файлов:', error);
  }
}

showFilesInfo();

