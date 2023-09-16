const http = require('http'); // встроенный модуль http
const server = http.createServer().listen(3000); // создание сервера, порт 3000

server.on('request', (req, res) => {
    console.log('res: ', res);
    const userName = getName(req, res);

    checkGender(userName, res);
});

function getName(req, res) {
    let userName;
    if (req.url === '/favicon.ico') {
        return res.end(); // Игнорируем запросы на favicon.ico
    }
    return (userName = req.url.substring(1));
}

function checkGender(userName, res) {
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${userName}`;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Нет ответа');
            }
            return response.json();
        })
        .then((data) => {
            if (data.gender === null) {
                console.log(
                    `The gender for "${data.name}" could not be determined.`
                );
                res.end(
                    `The gender for "${data.name}" could not be determined.`
                );
            } else {
                console.log(`${data.name} is ${data.gender}`);
                res.end(`${data.name} is ${data.gender}`);
            }
        })
        .catch((error) => {
            console.error(error);
            res.end('Ошибка!');
        });
}
