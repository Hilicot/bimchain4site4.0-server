'use strict';

const path = require('path');
const fs = require('fs');


exports.readAbi=(name) => {
    return require(path.resolve("database/contracts/"+name));
}
exports.storeVariable = (name, value) => {
    fs.writeFileSync(path.resolve("database/variables/"+name), JSON.stringify(value));
}

exports.readVariable = async (name) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve("database/variables/"+name), (err, data) => {
            console.log(JSON.parse(data.toString()))
            if (err) reject(err);
            else resolve(JSON.parse(data.toString()));
        });
    });
}