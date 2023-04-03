'use strict';

const path = require('path');
const fs = require('fs');


exports.readAbi=(name) => {
    return require(path.resolve("database/contracts/"+name));
}
exports.storeVariable = (name, value) => {
    fs.writeFileSync(path.resolve("database/variables/"+name), value);
}

exports.readVariable = async (name) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve("database/variables/"+name), (err, data) => {
            if (err) reject(err);
            else resolve(data.toString());
        });
    });
}