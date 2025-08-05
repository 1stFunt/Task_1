/**
 * Генерирует ёлку с этажами от 0 до 100.
 * Запуск: node index.js <этажи> [файл]
 * <этажи> — число этажей (0-100), [файл] — имя файла (по умолчанию tree.txt).
 * Пример: node index.js 5 mytree.txt
 */

const fs = require('fs');

// Центрирование строк
function centerLines(lines) {
  const maxLength = lines.reduce((max, line) => Math.max(max, line.length), 0);
  return lines.map(line => {
    const leftPadding = Math.floor((maxLength - line.length) / 2);
    return ' '.repeat(leftPadding) + line;
  });
}

// Генерация одного этажа со "змейкой"
function generateFloor(length, snakeFromLeft) {
  let starsCount = 2 * length - 1;
  let line = '';

  if (snakeFromLeft) {
    line = '@ ' + '* '.repeat(starsCount).trim();
  } else {
    line = '* '.repeat(starsCount).trim() + ' @';
  }
  return line;
}

/// Основная функция генерации ёлки с проверкой floors
function generateTree(floors) {
  // Проверка входного параметра floors
  if (typeof floors !== 'number' || isNaN(floors) || floors < 0 || floors > 100) {
    throw new Error('Количество этажей должно быть числом от 0 до 100');
  }

  const lines = [];

  // Верхушка (всегда)
  lines.push('W');
  lines.push('*');

  // Если этажей 0, не рисуем этажи, сразу ножка
  if (floors > 0) {
    for (let i = 1; i <= floors; i++) {
      const snakeFromLeft = i % 2 !== 0;
      const floorLine = generateFloor(i, snakeFromLeft);
      lines.push(floorLine);
    }
  }

  // Ножка (всегда)
  lines.push('TTTTT');
  lines.push('TTTTT');

  return centerLines(lines);
}

// Функция записи массива строк с ёлкой в файл
function saveTreeToFile(lines, outputFile) {
  const outputText = lines.join('\n');
  fs.writeFileSync(outputFile, outputText, 'utf-8');
  console.log(`Ёлка сохранена в файле ${outputFile}`);
}

module.exports = { generateTree, saveTreeToFile };