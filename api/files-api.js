'use strict';

const filesDAO = require('../dao/files-dao');

exports.register = (app, upload) => {
    // get all files of a project
    app.get('/api/files/:project_id', async (req, res) => {
        const project_id = req.params.project_id;
        const files = await filesDAO.getProjectFiles(project_id);
        res.json({ data: files });
    });

    // get a specific file of a project
    app.get('/api/files/:project_id/:name/:version', async (req, res) => {
        const project_id = req.params.project_id;
        const name = req.params.name;
        const version = req.params.version;
        try{
        const file = await filesDAO.getProjectFile(project_id, name, version);
        res.json({data:file});
        }catch(err){
            console.log(err);
            res.json({data:""});
        }       
    });

    // store a file of a project
    app.post('/api/files', upload.single("data"), async (req, res) => {
        const project_id = req.body.project_id;
        const name = req.body.name;
        const version = req.body.version;
        const data = req.body.data;
        const file = await filesDAO.storeProjectFile(project_id, name, version, data);
        res.json({ data: "done" });
    });

}