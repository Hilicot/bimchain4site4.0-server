'use strict';

const { db } = require('./db');

exports.getUserProjects = async (address) => {
        const rows = await db.all('SELECT * FROM projects WHERE id IN (SELECT project_id FROM project_users WHERE user_address = ?)', [address]);
        if (rows === undefined)
            return {error: "User not found"};
        else
            return rows;
        
};

exports.registerProject = async (name, description, contractFile) => {
        await db.run('INSERT INTO projects (name, description, contract_file) VALUES (?, ?, ?)', [name, description, contractFile]);
        return { name: name, description: description, contractFile: contractFile };
};

exports.registerUserToProject = async (address, projectId, permissions) => {
        const row = await db.get('SELECT * FROM project_users WHERE user_address = ? AND project_id = ?', [address, projectId])
        if (row !== undefined)
            return {error: "User already registered to project"};
        else {
            await db.run('INSERT INTO project_users (user_address, project_id, permissions) VALUES (?, ?, ?)', [address, projectId, permissions]);
            return { address: address, projectId: projectId, permissions: permissions };
        }
}


