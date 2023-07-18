'use strict';

const projectsDAO = require('../dao/project-dao');

exports.register = (app) => {   
    // register new project. Returns the compiled contract file (to be deployed on the blockchain)
    app.post('/api/projects', async (req, res) => {
        const { name, address, creator, users } = req.body;
        res.status(200);
        try {
            const project = await projectsDAO.registerProject(name, address, creator);
            await Promise.all(users.map(user => projectsDAO.registerUserToProject(user, project.id)));
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
            const projects_plus_users = await Promise.all(projects.map(async (project) => {
                const users = await projectsDAO.getProjectUsers(project.id);
                return { ...project, users };
            }));
            res.status(200).json(projects_plus_users);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    // get all projects
    app.get('/api/projects', async (req, res) => {
        try {
            const projects = await projectsDAO.getAllProjects();
            res.status(200).json(projects);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    // get users of project
    app.get('/api/projects/:id/users', async (req, res) => {
        const { id } = req.params;
        try {
            const users = await projectsDAO.getProjectUsers(id);
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    app.post('/api/projects/registerUser', async (req, res) => {
        const { address, projectId } = req.body;
        try {
            const project = await projectsDAO.registerUserToProject(address, projectId);
            res.status(200).json(project);
        } catch (err) {
            res.status(500).json(err);
        }
    });
    app.delete('/api/projects/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const project = await projectsDAO.deleteProject(id);
            res.status(200).json(project);
        } catch (err) {
            res.status(500).json(err);
        }
    });
}

