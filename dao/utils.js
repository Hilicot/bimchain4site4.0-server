'use strict';

const path = require('path');
const fs = require('fs');

// TODO delete?
exports.readAbi=(name) => {
    return require(path.resolve("database/contracts/"+name));
}

exports.storeVariable = async (name, value) => {
    await fs.writeFile(path.resolve("database/variables/"+name), value, (err) => {
        if (err) throw err;
    });
}

exports.readVariable = async (name) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve("database/variables/"+name), (err, data) => {
            if (err) reject(err);
            else resolve(data.toString());
        });
    });
}

exports.deleteVariable = async (name) => {
    await fs.unlink(path.resolve("database/variables/"+name));
}


