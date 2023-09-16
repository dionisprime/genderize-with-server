const http = require('http'); // встроенный модуль http
const server = http.createServer().listen(3000); // создание сервера, порт 3000

server.on('request', async (req, res) => {
    try {
        let userName =
            req.url === '/favicon.ico' ? res.end() : req.url.substring(1);

        await checkGender(userName, res);
    } catch (error) {
        console.error('Error: ', error.message);
    }
});

async function checkGender(name, res) {
    const data = await getGenderInfoByName(name);
    if (data.gender === null) {
        console.log(`The gender for "${data.name}" could not be determined.`);
        res.end(`The gender for "${data.name}" could not be determined.`);
    } else {
        console.log(`${name} is ${data.gender}.`);
        res.end(`${data.name} is ${data.gender}`);
    }
}

async function getGenderInfoByName(name) {
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${name}`;
    const response = await fetch(url);
    return (await response.json()) || {};
}
