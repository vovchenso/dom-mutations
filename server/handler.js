const data = [];

const log = (info) => {
    if (info) {
        const json = JSON.parse(info);
        if (Array.isArray(json)) {
            data.push(...json);
        } else {
            data.push(json);
        }
    }
};

const report = () => {
    return data;
};

module.exports = {
    log,
    report
};