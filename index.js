const fs = require('fs');
const { generateTree } = require('./tree-generator');

const floors = parseInt(process.argv[2]);
const outputFile = process.argv[3] || 'tree.txt';

try {
  const lines = generateTree(floors);
  const outputText = lines.join('\n');
  fs.writeFileSync(outputFile, outputText, 'utf-8');
  console.log(`Ёлка сохранена в файле ${outputFile}`);
} catch (error) {
  console.error('Ошибка:', error.message);
  process.exit(1);
}