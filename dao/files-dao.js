'use strict';

const fs = require('fs');
const path = require('path');

exports.getProjectFiles = async (project_id) => {
    fs.readdir(path.resolve("database/files/"), (err, files) => {
        if (err) throw err;
        return Prmoise.all(files.map(file => {
            let number = file.match(/^\d+/)[0]; // Get the number at the beginning of the file name.
            if (number == str(project_id)) {
                return fs.readFile(path.resolve("database/files/" + project_id + "_" + name + "_" + version))
            }
        }));
    });
}

exports.getProjectFile = (project_id, name, version) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve("database/files/" + project_id + "_" + name + "_" + version), (err, data) => {
            console.log(data)
            if (err || !data)
                resolve("")
            else
                resolve(data.toString());
        });
    });
}

exports.storeProjectFile = async (project_id, name, version, data) => {
    await fs.writeFile(path.resolve("database/files/" + project_id + "_" + name + "_" + version), data, (err) => {
        if (err) throw err;
    });
}