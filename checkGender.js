const getGenderInfoByName = require('./getGenderInfo.js');

async function checkGender(name) {
    const data = await getGenderInfoByName(name);
    if (data.gender === null) {
        return `The gender for "${data.name}" could not be determined.`;
    } else {
        return `${data.name} is ${data.gender}`;
    }
}

module.exports = checkGender;
