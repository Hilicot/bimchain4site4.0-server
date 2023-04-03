'use strict';

const { db } = require('./db');
const { storeVariable, readVariable } = require('./utils');

exports.saveVariable = async (project_id, name, value) => {
    return new Promise((resolve, reject) => {
        storeVariable(project_id+"_"+name, value);
        db.run('INSERT INTO project_variables (project_id, name) VALUES (?,?)', [project_id, name], (err) => {
            if (err !== null){
                reject({ message: "Unable to save variable" });
            }else
                resolve({ project_id: project_id, name: name, value: value });
        });
    });
}

exports.getVariable = async (project_id, name) => {
    try {
        const value = await readVariable(project_id+"_"+name);
        return { project_id: project_id, name: name, value: value };
    } catch (err) {
        // delete file (it doen't work anyway)
        await this.deleteVariable(project_id, name);
        return { message: "Variable does not exist" };
    };
}

exports.deleteVariable = (project_id, name) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM project_variables WHERE project_id = ? AND name = ?', [project_id, name], (err) => {
            if (err !== null)
                reject({ message: "Unable to delete variable" });
            else
                resolve({ project_id: project_id, name: name });
        });
    });
}