'use strict';

const { storeVariable, readVariable } = require('./utils');

exports.saveVariable = async (project_id, name, value) => {
        await storeVariable(project_id+"_"+name, value);
        return { project_id: project_id, name: name, value: value };
}

exports.getVariable = async (project_id, name) => {
    try {
        const value = await readVariable(project_id+"_"+name);
        return { project_id: project_id, name: name, value: value };
    } catch (err) {
        // delete file (it doesn't work anyway)
        await this.deleteVariable(project_id, name);
        return { message: "Variable does not exist" };
    };
}

exports.deleteVariable = async (project_id, name) => {
    await deleteVariable(project_id+"_"+name);
}