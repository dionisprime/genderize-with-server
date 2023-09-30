// реализация консольного гендерайз на async/await, и с рекурсией
const checkGender = require('./checkGender.js');
const readline = require('node:readline/promises').createInterface({
    // node:readline/promises - Промисифицированная версия библиотеки 'readline'. Чтобы коллбэки не писать, а эвэйтить.
    // создаем интерфейс
    input: process.stdin, // ввод через консоль
    output: process.stdout, // вывод. через консоль
});

async function getGenderResult() {
    try {
        const name = await readline.question(
            'What is your name? (or enter Ctrl + C to exit) '
        );

        const result = await checkGender(name.trim()); // trim() убирает возможные пробелы перед и после слова
        console.log(result);
    } catch (error) {
        console.error('Error: ', error.message);
    } finally {
        getGenderResult(); // запускаем функцию рекурсивно, чтобы после ответа программа задавала вопрос заново
    }
}

getGenderResult();
