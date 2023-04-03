'use strict';

const projectsDAO = require('../dao/project-dao');
const variablesDAO = require('../dao/variables-dao');

exports.register = (app) => {
    // get variable
    app.get('/api/variables/:project_id/:name', async (req, res) => {
        const { project_id, name } = req.params;
        if (project_id === undefined || isNaN(parseInt(project_id)) || name === undefined || typeof name !== 'string'){
            res.status(400).json({ error: 'Bad request' });
            return
        }

        try {
            const variables = await variablesDAO.getVariable(project_id, name);
            console.log(variables)
            res.status(200).json(variables);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    // save variable
    app.post('/api/variables', async (req, res) => {
        const { project_id, name, value } = req.body;
        if (project_id === undefined || typeof project_id !== "number" || typeof project_id !== "number" || name === undefined || typeof name !== 'string' || value === undefined)
            res.status(400).json({ error: 'Bad request' });
        try {
            const variables = await variablesDAO.saveVariable(parseInt(project_id), name, value);
            res.status(200).json(variables);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    // delete variable
    app.delete('/api/variables/:project_id/:name', async (req, res) => {
        const { project_id, name } = req.params;
        if (project_id === undefined || isNaN(parseInt(project_id)) || name === undefined || typeof name !== 'string')
            res.status(400).json({ error: 'Bad request' });
        try {
            const variables = await variablesDAO.deleteVariable(project_id, name);
            res.status(200).json(variables);
        } catch (err) {
            res.status(500).json(err);
        }
    });
}
