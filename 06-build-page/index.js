const fileSystem = require('fs');
const pathModule = require('path');

const projectDirectory = pathModule.join(__dirname, 'project-dist');
fileSystem.mkdir(projectDirectory, { recursive: true }, (error) => {
    if (error) throw error;
});

const templateFilePath = pathModule.join(__dirname, 'template.html');
const componentsDirectory = pathModule.join(__dirname, 'components');
const outputFilePath = pathModule.join(projectDirectory, 'index.html');

fileSystem.readFile(templateFilePath, 'utf8', (error, templateContent) => {
    if (error) throw error;

    fileSystem.readdir(componentsDirectory, (error, files) => {
        if (error) throw error;

        let modifiedTemplate = templateContent;

        files.forEach(file => {
            const componentFilePath = pathModule.join(componentsDirectory, file);
            const componentName = pathModule.basename(file, '.html');
            const templateTag = `{{${componentName}}}`;

            fileSystem.readFile(componentFilePath, 'utf8', (error, componentContent) => {
                if (error) throw error;

                modifiedTemplate = modifiedTemplate.replace(new RegExp(templateTag, 'g'), componentContent);

                fileSystem.writeFile(outputFilePath, modifiedTemplate, (error) => {
                    if (error) throw error;
                    console.log('Файл index.html был создан');
                });
            });
        });
    });
});

const stylesDirectory = pathModule.join(__dirname, 'styles');
const stylesOutputFilePath = pathModule.join(projectDirectory, 'style.css');

fileSystem.readdir(stylesDirectory, (error, files) => {
    if (error) throw error;

    const stylesContentArray = [];

    files.forEach(file => {
        const styleFilePath = pathModule.join(stylesDirectory, file);
        const fileExtension = pathModule.extname(file);

        if (fileExtension === '.css') {
            fileSystem.readFile(styleFilePath, 'utf8', (error, data) => {
                if (error) throw error;
                stylesContentArray.push(data);

                fileSystem.writeFile(stylesOutputFilePath, stylesContentArray.join('\n'), (error) => {
                    if (error) throw error;
                    console.log('Файл style.css был создан');
                });
            });
        }
    });
});

const assetsDirectory = pathModule.join(__dirname, 'assets');
const assetsOutputDirectory = pathModule.join(projectDirectory, 'assets');

function copyDirectory(source, destination) {
    fileSystem.mkdir(destination, { recursive: true }, (error) => {
        if (error) throw error;

        fileSystem.readdir(source, (error, files) => {
            if (error) throw error;

            files.forEach(file => {
                const sourcePath = pathModule.join(source, file);
                const destinationPath = pathModule.join(destination, file);

                fileSystem.stat(sourcePath, (error, stats) => {
                    if (error) throw error;

                    if (stats.isDirectory()) {
                        copyDirectory(sourcePath, destinationPath);
                    } else {
                        fileSystem.copyFile(sourcePath, destinationPath, (error) => {
                            if (error) throw error;
                            console.log(`Файл ${file} был скопирован`);
                        });
                    }
                });
            });
        });
    });
}

copyDirectory(assetsDirectory, assetsOutputDirectory);
