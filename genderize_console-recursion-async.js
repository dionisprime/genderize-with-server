// реализация консольного гендерайз на async/await, и с рекурсией
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
        getGenderResult(); // запускаем функцию рекурсивно, чтобы после ответа программа задавала вопрос заново
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

async function checkGender(name) {
    const data = await getGenderInfoByName(name);
    if (data.gender === null) {
        return `The gender for "${data.name}" could not be determined.`;
    } else {
        return `${data.name} is ${data.gender}.`;
    }
}

async function getGenderInfoByName(name) {
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${name}`;
    const response = await fetch(url);
    return (await response.json()) || {};
}

getGenderResult();
