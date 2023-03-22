'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/db.sqlite', err => {
        if (err) reject(err);
    });

exports.createDBifNotExists = async () => {
    // create tables if they don't exist
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS users (address TEXT PRIMARY KEY, name TEXT, surname TEXT, email TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, description TEXT, contract_file TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS project_users (project_id INTEGER, user_address TEXT, permissions INTEGER, FOREIGN KEY(project_id) REFERENCES projects(id), FOREIGN KEY(user_address) REFERENCES users(address))');
        db.run('CREATE TABLE IF NOT EXISTS project_files (project_id INTEGER, name TEXT, type TEXT, url TEXT, path TEXT, FOREIGN KEY(project_id) REFERENCES projects(id))');
    });
}

exports.db = db
