'use strict';

const sqlite = require('sqlite3');

let db = null;

exports.loadDB = async () => {
    db = await new sqlite.Database('./dao/users.sqlite', err => {
        if (err) reject(err);
    });
    // create tables if they don't exist
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS users (address TEXT PRIMARY KEY, name TEXT, surname TEXT, email TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, contract_file TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS project_users (project_id INTEGER, user_address TEXT, permissions INTEGER, FOREIGN KEY(project_id) REFERENCES projects(id), FOREIGN KEY(user_address) REFERENCES users(address))');
    });
}

exports.getDBsync = () => {return db};
