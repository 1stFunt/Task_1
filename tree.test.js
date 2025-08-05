/**
 * Тесты реализованы с использованием встроенного модуля assert через Node.js
 * Запускать эти тесты можно командой: npm test
 * 
 * Для более лаконичного, удобного и информативного тестирования, с красивыми отчётами,
 * параметризацией и удобным управлением тестами можно использовать, например, Jest
 */

const assert = require('assert');
const { generateTree } = require('./tree-generator');

// Тесты: валидные входные данные — 0, 1 и 100 этажей
function testValidInputs() {
    const validCases = [
        { input: 0, expectedLength: 4, description: '0 этажей — особый случай (только верхушка, звезда и подставка)' },
        { input: 1, expectedLength: 5, description: '1 этаж — минимальное валидное значение' },
        { input: 100, expectedLength: 104, description: '100 этажей — максимальное валидное значение' }
    ];

    validCases.forEach(({ input, expectedLength, description }) => {
        const result = generateTree(input);
        assert.strictEqual(result.length, expectedLength, `${description}: должно быть ${expectedLength} строк`);
        checkBasicTreeStructure(result);

        // Проверка змейки только при этажах > 0
        if (input > 0) {
            assert.ok(result.some(line => line.includes('@')), `${description}: ожидается змейка с символом @`);
        }
    });

    console.log('✅ Валидные тесты пройдены');
}

// Негативные тесты: неверные входные данные
function testInvalidInputs() {
    const invalidInputs = [-1, 101, 'abc', '', null, undefined, NaN, {}, []];

    invalidInputs.forEach(input => {
        try {
            generateTree(input);
            // Если не выброшено исключение — тест должен упасть
            assert.fail(`Ожидалась ошибка для входа: ${JSON.stringify(input)}`);
        } catch (err) {
            // Проверяем, что сообщение об ошибке корректное
            assert.strictEqual(
                err.message,
                'Количество этажей должно быть числом от 0 до 100',
                `Неверное сообщение об ошибке для входа: ${JSON.stringify(input)}`
            );
        }
    });
    console.log('✅ Негативные тесты пройдены');
}

testValidInputs();
testInvalidInputs();

// Вспомогательная функция для проверки базовой структуры елки
function checkBasicTreeStructure(result) {
    assert.strictEqual(result[0].trim(), 'W', 'Первая строка — верхушка W');
    assert.strictEqual(result[1].trim(), '*', 'Вторая строка — звезда *');
    assert.ok(result[result.length - 2].includes('T'), 'Предпоследняя строка — подставка T');
    assert.ok(result[result.length - 1].includes('T'), 'Последняя строка — подставка T');
}