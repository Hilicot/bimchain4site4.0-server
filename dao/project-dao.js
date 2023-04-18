'use strict';

const { db } = require('./db');

exports.getUserProjects = (address) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM projects WHERE id IN (SELECT project_id FROM project_users WHERE user_address = ?)', [address], (err, rows) => {
            if (rows === undefined)
                reject({ message: "User not found" });
            else
                resolve(rows.map(row => { return { id: row.id, name: row.name, address: row.address, creator:row.creator } }));
        });
    });
};

exports.getProjectUsers = (projectId) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM project_users WHERE project_id = ?', [projectId], (err, rows) => {
            if (rows === undefined)
                reject({ message: "Project not found" });
            else
                resolve(rows.map(row => { return row.user_address }));
        });
    });
};

exports.registerProject = async (name, address, creator) => {
    return new Promise((resolve, reject) => {
        //fetch 
        db.get('SELECT * FROM projects WHERE name = ?', [name], (err, row) => {
            if (row !== undefined)
                reject({ message: "There is already a project with that name!" });
            else {
                db.run('INSERT INTO projects (name, address, creator) VALUES (?, ?, ?)', [name, address, creator], (err) => {
                    if (err !== null)
                        reject({ message: err.message });
                    else {
                        db.get('SELECT * FROM projects WHERE name = ?', [name], (err, row) => {
                            resolve({ id: row.id, name: name, address: address, creator:creator });
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

exports.registerUserToProject = (address, projectId) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM project_users WHERE user_address = ? AND project_id = ?', [address, projectId], (err, row) => {
            if (row !== undefined)
                reject({ error: "User already registered to project" });
            else {
                db.run('INSERT INTO project_users (user_address, project_id) VALUES (?, ?)', [address, projectId], (err) => {
                    if (err !== null)
                        reject({ message: err.message });
                    else
                        resolve({ address: address, projectId: projectId });
                });
            }
        });
    });
}


