'use strict';

const { db } = require('./db');

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
            if (rows === undefined)
                reject({ message: "No users found" });
            else
                resolve(rows);
        });
    });
};


exports.getUserByAddress = (address) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE address = ?', [address], (err, row) => {
            if (row === undefined)
                reject({ message: "User not found" });
            else
                resolve({ address: row.address, name: row.name, surname: row.surname, email: row.email });
        });
    });
};

exports.registerUser = (address, name, surname, email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE address = ?', [address], (err, row) => {
            if (row !== undefined)
                reject({ message: "User already registered" });
            else {
                db.run('INSERT INTO users (address, name, surname, email) VALUES (?, ?, ?, ?)', [address, name, surname, email], (err) => {
                    if (err !== null)
                        reject({ message: err.message });
                    else
                        resolve({ address: address, name: name, surname: surname, email: email });
                });
            }
        });
    });
}

