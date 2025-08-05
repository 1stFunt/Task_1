const { generateTree, saveTreeToFile } = require('./tree-generator');

const floors = parseInt(process.argv[2]);
const outputFile = process.argv[3] || 'tree.txt';

try {
    const lines = generateTree(floors);
    saveTreeToFile(lines, outputFile);
} catch (error) {
    console.error('Ошибка:', error.message);
    process.exit(1); // Завершить с ошибкой
}