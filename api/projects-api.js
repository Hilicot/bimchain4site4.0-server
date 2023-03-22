'use strict';

const projectsDAO = require('../dao/project-dao');

exports.register = (app) => {   
    // register new project. Returns the compiled contract file (to be deployed on the blockchain)
    app.post('/api/projects/register', async (req, res) => {
        const { name, description, creator } = req.body;
        res.status(200);
        try {
            const project = await projectsDAO.registerProject(name, description);
            await projectsDAO.registerUserToProject(creator, project.id, 777);
            res.status(200).json(project);
        } catch (err) {
            res.status(500).json(err);
        }
    });
    // get project of user
    app.get('/api/projects/:address', async (req, res) => {
        const { address } = req.params;
        try {
            const projects = await projectsDAO.getUserProjects(address);
            res.status(200).json(projects);
        } catch (err) {
            res.status(500).json(err);
        }
    });
    app.post('/api/projects/registerUser', async (req, res) => {
        const { address, projectId, permissions } = req.body;
        try {
            const project = await projectsDAO.registerUserToProject(address, projectId, permissions);
            res.status(200).json(project);
        } catch (err) {
            res.status(500).json(err);
        }
    });
}

