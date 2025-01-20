const fileSystem = require('fs');
const pathModule = require('path');

const stylesDirectory = pathModule.join(__dirname, 'styles');
const outputDirectory = pathModule.join(__dirname, 'project-dist');
const bundleFile = pathModule.join(outputDirectory, 'bundle.css');

fileSystem.readdir(stylesDirectory, (error, files) => {
    if (error) throw error;

    const stylesContent = [];

    files.forEach(file => {
        const currentFilePath = pathModule.join(stylesDirectory, file);
        const currentFileExtension = pathModule.extname(file);

        if (currentFileExtension === '.css') {
            fileSystem.readFile(currentFilePath, 'utf8', (error, data) => {
                if (error) throw error;
                stylesContent.push(data);
                fileSystem.writeFile(bundleFile, stylesContent.join('\n'), (error) => {
                    if (error) throw error;
                    console.log('Стили были объединены в bundle.css');
                });
            });
        }
    });
});
