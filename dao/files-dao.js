'use strict';

const fs = require('fs');
const readline = require('readline');
const path = require('path');

const chunkSize = 1000000;

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

exports.getProjectFile = async (project_id, name, version) => {
    const decoded_name = decodeURIComponent(name);
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve("database/files/" + project_id + "_" + decoded_name + "_" + version), (err, data) => {
            console.log(data)
            if (err || !data)
                resolve("")
            else
                try {
                    resolve(data.toString());
                } catch (err) {
                    resolve("");
                }
        });
    });
}

exports.storeProjectFile = async (project_id, name, version, data) => {
    await fs.writeFile(path.resolve("database/files/" + project_id + "_" + name + "_" + version), data, (err) => {
        if (err) throw err;
    });
}


const convertFileToChunks = (filePath) => {
    console.log("converting file to chunks");
    return new Promise((resolve, reject) => {
        const chunks = [];

        try {
            const fileStream = fs.createReadStream(filePath);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });
            rl.on('line', (line) => {
                chunks.push(line);
                if (chunks.length === chunkSize) {
                    rl.pause();
                    resolve(chunks.splice(0));
                }
            });
            rl.on('close', () => {
                if (chunks.length > 0) {
                    resolve(chunks.splice(0));
                } else {
                    resolve(chunks);
                }
            });
            fileStream.on('error', (error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};