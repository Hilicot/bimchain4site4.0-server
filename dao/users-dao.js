'use strict';

const { getDBsync } = require('./db');
const db = getDBsync();

exports.getUserByAddress = async(address) => {
        const row = await db.get('SELECT * FROM users WHERE address = ?', [address])
        if (row === undefined)
            return {error: "User not found"};
        else
            return { address: row.address, name: row.name, surname:row.surname, email: row.email };
};

exports.registerUser = async (address, name, surname, email) => {
        const row = await db.get('SELECT * FROM users WHERE address = ?', [address])
        if (row !== undefined)
            return {error: "User already registered"};
        else {
            await db.run('INSERT INTO users (address, name, surname, email) VALUES (?, ?, ?, ?)', [address, name, surname, email]);
            return { address: address, name: name, surname: surname, email: email };
        }
};


