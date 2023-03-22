'use strict';

const path = require('path');


exports.readAbi=(name) => {
    return require(path.resolve("database/contracts/"+name));
}