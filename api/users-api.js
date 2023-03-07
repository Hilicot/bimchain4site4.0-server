'use strict';

const usersDAO = require('../dao/users-dao');
const projectsDAO = require('../dao/project-dao');

exports.register = (app) => {   
    app.post('/api/users/register', async (req, res) => {
        //TODO implement the code verification
        const { firstName, lastName, email, code, address} = req.body;
        try {
            const user = await usersDAO.registerUser(address, firstName, lastName, email);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    });
    app.get('/api/users/:address', async (req, res) => {
        const { address } = req.params;
        try {
            const user = await usersDAO.getUserByAddress(address);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    });
    app.post('/api/projects/register', async (req, res) => {
        const { name, description, contractFile } = req.body;
        try {
            const project = await projectsDAO.registerProject(name, description, contractFile);
            res.status(200).json(project);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    });
    app.get('/api/projects/:address', async (req, res) => {
        const { address } = req.params;
        try {
            const projects = await projectsDAO.getUserProjects(address);
            res.status(200).json(projects);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    });
    app.post('/api/projects/registerUser', async (req, res) => {
        const { address, projectId, permissions } = req.body;
        try {
            const project = await projectsDAO.registerUserToProject(address, projectId, permissions);
            res.status(200).json(project);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    });
}

