async function getGenderInfoByName(name) {
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${name}`;
    const response = await fetch(url);
    return (await response.json()) || {};
}

module.exports = getGenderInfoByName;
