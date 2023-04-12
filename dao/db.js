'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('./database/db.sqlite', err => {
        if (err) reject(err);
    });

exports.createDBifNotExists = async () => {
    // create tables if they don't exist
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS users (address TEXT PRIMARY KEY, name TEXT, surname TEXT, email TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, description TEXT, address TEXT)');
        db.run('CREATE TABLE IF NOT EXISTS project_users (project_id INTEGER, user_address TEXT, permissions INTEGER, FOREIGN KEY(project_id) REFERENCES projects(id), FOREIGN KEY(user_address) REFERENCES users(address))');
        db.run('CREATE TABLE IF NOT EXISTS project_files (project_id INTEGER, name TEXT, type TEXT, url TEXT, path TEXT, version INTEGER, FOREIGN KEY(project_id) REFERENCES projects(id), PRIMARY KEY(project_id, name, version))');
        db.run('CREATE TABLE IF NOT EXISTS project_variables (project_id INTEGER, name TEXT, FOREIGN KEY(project_id) REFERENCES projects(id), PRIMARY KEY(project_id, name))');
    });
}

exports.db = db
