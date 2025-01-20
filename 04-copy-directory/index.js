const fileSystem = require('fs');
const filePath = require('path');
const fileSystemPromises = fileSystem.promises;

async function duplicateDirectory(source, destination) {
    await fileSystemPromises.mkdir(destination, { recursive: true });

    const items = await fileSystemPromises.readdir(source, { withFileTypes: true });

    for (let item of items) {
        const sourcePath = filePath.join(source, item.name);
        const destinationPath = filePath.join(destination, item.name);

        if (item.isDirectory()) {
            await duplicateDirectory(sourcePath, destinationPath);
        } else {
            await fileSystemPromises.copyFile(sourcePath, destinationPath);
        }
    }
}

const sourceFolder = filePath.join(__dirname, 'files');
const destinationFolder = filePath.join(__dirname, 'files-copy');

duplicateDirectory(sourceFolder, destinationFolder)
    .then(() => console.log('Directory copied successfully!'))
    .catch(err => console.error('Error copying directory:', err));
