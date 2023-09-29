const checkGender = require('./checkGender.js');
const http = require('http'); // встроенный модуль http
const server = http.createServer().listen(3000, () => {
    console.log(
        'Enter http://localhost:3000/name in the browser - where "name" is the name of the person being checked'
    );
}); // создание сервера, порт 3000

server.on('request', async (req, res) => {
    try {
        if (req.url === '/favicon.ico') {
            return res.end(); // Игнорируем запросы на favicon.ico
        }
        const userName = req.url.substring(1);

        const result = await checkGender(userName);

        res.end(result);
        console.log(result);
    } catch (error) {
        console.error('Error: ', error.message);
        res.end(error.message);
    }
});
