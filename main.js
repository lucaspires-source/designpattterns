const fs = require('fs');
const path = require('path');

const directoryPath = './designPatterns';

function listFoldersInDirectory(directoryPath) {
    return fs.readdirSync(directoryPath).filter(file => fs.statSync(path.join(directoryPath, file)).isDirectory());
}

function displayMenu(folders) {
    console.log("Menu:");
    folders.forEach((folder, index) => {
        console.log(`${index + 1}. ${folder}`);
    });
    console.log(`${folders.length + 1}. Exit`);
}

function handleUserInput(folders) {
    const stdin = process.stdin;
    stdin.setEncoding('utf8');

    function handleInput(input) {
        const index = parseInt(input.trim());
        if (index >= 1 && index <= folders.length) {
            const selectedFolder = folders[index - 1];
            const folderPath = path.join(__dirname, 'designPatterns', selectedFolder);
            const indexPath = path.join(folderPath, 'index.js');
            if (fs.existsSync(indexPath)) {
                require(indexPath);
            } else {
                console.log("index.js not found in selected folder.");
            }
            stdin.removeListener('data', handleInput);
        } else if (index === folders.length + 1) {
            console.log("Exiting...");
            process.exit(0);
        } else {
            console.log("Invalid option, please select again");
            displayMenu(folders);
        }
    }

    stdin.on('data', handleInput);
}

function main() {
    const folders = listFoldersInDirectory(directoryPath);
    displayMenu(folders);
    handleUserInput(folders);
}

main();

