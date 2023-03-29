'use strict';

const { db } = require('./db');
const { storeVariable, readVariable } = require('./utils');

exports.saveVariable = async (project_id, name, value) => {
    return new Promise((resolve, reject) => {
        storeVariable(name, value);
        db.run('INSERT INTO project_variables (project_id, name) VALUES (?,?)', [project_id, name], (err) => {
            if (err !== null)
                reject({ message: err.message });
            else
                resolve({ project_id: project_id, name: name, value: value });
        });
    });
}

exports.getVariable = (project_id, name) => {
    return new Promise((resolve, reject) => {
        readVariable(name).then(value => {
            console.log(value)
            resolve({ project_id: project_id, name: name, value: value });
        }).catch(err => {
            // delete file (it doen't work anyway)
            this.deleteVariable(project_id, name).then(reject({ message: err }))
        });
    });
}

exports.deleteVariable = (project_id, name) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM project_variables WHERE project_id = ? AND name = ?', [project_id, name], (err) => {
            if (err !== null)
                reject({ message: err.message });
            else
                resolve({ project_id: project_id, name: name });
        });
    });
}