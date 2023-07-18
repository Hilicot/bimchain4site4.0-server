'use strict';

const { storeVariable, readVariable, deleteVariable } = require('./utils');

exports.saveVariable = async (project_id, name, value) => {
    const decoded_name = decodeURIComponent(name);
    await storeVariable(project_id + "_" + decoded_name, value);
    return { project_id: project_id, name: decoded_name, value: value };
}

exports.getVariable = async (project_id, name) => {
    const decoded_name = decodeURIComponent(name);
    try {
        const value = await readVariable(project_id + "_" + decoded_name);
        return { project_id: project_id, name: decoded_name, value: value };
    } catch (err) {
        // delete file (it doesn't work anyway)
        //await this.deleteVariable2(project_id, decoded_name);
        return { message: "Variable does not exist" };
    };
}

exports.deleteVariable2 = async (project_id, name) => {
    await deleteVariable(project_id + "_" + name);
}