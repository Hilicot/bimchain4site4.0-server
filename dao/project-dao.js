'use strict';

const { db } = require('./db');
const { readAbi } = require('./utils');

exports.getUserProjects = (address) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM projects WHERE id IN (SELECT project_id FROM project_users WHERE user_address = ?)', [address], (err, rows) => {
            if (rows === undefined)
                reject({ message: "User not found" });
            else
                resolve(rows.map(row => { return { id: row.id, name: row.name, description: row.description, address: row.address } }));
        });
    });
};

exports.registerProject = async (name, description, address) => {
    return new Promise((resolve, reject) => {
        //fetch 
        db.get('SELECT * FROM projects WHERE name = ?', [name], (err, row) => {
            if (row !== undefined)
                reject({ message: "There is already a project with that name!" });
            else {
                db.run('INSERT INTO projects (name, description, address) VALUES (?, ?, ?)', [name, description, address], (err) => {
                    if (err !== null)
                        reject({ message: err.message });
                    else {
                        db.get('SELECT * FROM projects WHERE name = ?', [name], (err, row) => {
                            resolve({ id: row.id, name: name, description: description, address: address });
                        });
                    }
                });
            }
        });
    });
};

exports.getProjectById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
            if (row === undefined)
                reject({ message: "Project not found" });
            else
                resolve(row);
        });
    });
};

exports.deleteProject = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM projects WHERE id = ?', [id], (err) => {
            if (err !== null)
                reject({ message: err.message });
            else
                resolve({ id: id });
        });
    });
};

exports.registerUserToProject = (address, projectId, permissions) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM project_users WHERE user_address = ? AND project_id = ?', [address, projectId], (err, row) => {
            if (row !== undefined)
                reject({ error: "User already registered to project" });
            else {
                db.run('INSERT INTO project_users (user_address, project_id, permissions) VALUES (?, ?, ?)', [address, projectId, permissions], (err) => {
                    if (err !== null)
                        reject({ message: err.message });
                    else
                        resolve({ address: address, projectId: projectId, permissions: permissions });
                });
            }
        });
    });
}


