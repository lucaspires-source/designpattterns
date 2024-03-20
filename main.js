const fs = require('fs');
const path = require('path');

const directoryPath = './designPatterns';

function listJavaScriptFilesInDirectory(directoryPath) {
    return fs.readdirSync(directoryPath).filter(file => path.extname(file) === '.js');
}

function displayMenu(files) {
    console.log("Menu:");
    files.forEach((file, index) => {
        console.log(`${index + 1}. ${file}`);
    });
    console.log(`${files.length + 1}. Exit`);
}

function handleUserInput(files) {
    const stdin = process.stdin;
    stdin.setEncoding('utf8');

    function handleInput(input) {
        const index = parseInt(input.trim());
        if (index >= 1 && index <= files.length) {
            const selectedFile = files[index - 1];
            const filePath = path.join(__dirname, 'designPatterns', selectedFile);
            require(filePath);
            stdin.removeListener('data', handleInput);
        } else if (index === files.length + 1) {
            console.log("Exiting...");
            process.exit(0);
        } else {
            console.log("Invalid option, please select again");
            displayMenu(files);
        }
    }

    stdin.on('data', handleInput);
}



function main() {
    const files = listJavaScriptFilesInDirectory(directoryPath);
    displayMenu(files);
    handleUserInput(files);
}

main();
