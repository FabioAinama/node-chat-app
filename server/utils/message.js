let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

let generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.fr/maps/@${latitude},${longitude}`,
        createdAt: new Date().getDate()
    }
};

module.exports = {generateMessage, generateLocationMessage};