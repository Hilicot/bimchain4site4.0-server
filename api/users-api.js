'use strict';

const usersDAO = require('../dao/users-dao');

/**
 * @module users-api
 * @description Provides REST API endpoints for managing users.
 * @param {Object} app - The express application instance.
 * 
 * API:
 * GET /api/users/:address
 * - returns a user given its address
 * GET /api/users
 * - returns all users
 * POST /api/users/register
 * - registers a new user
 */

exports.register = (app) => {   
    app.post('/api/users/register', async (req, res) => {
        //TODO implement the code verification
        const { firstName, lastName, email, address} = req.body;
        if(firstName === undefined || lastName === undefined || address === undefined) {
            res.status(400).json({message: "Missing parameters"});
            return;
        }
        try {
            const user = await usersDAO.registerUser(address, firstName, lastName, email);
            res.status(200).json(user);
        } catch (err) {
            
            res.status(500).json(err);
        }
    });

    // TODO remove for security?
    app.get('/api/users', async (req, res) => {
        try {
            const users = await usersDAO.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    });

    app.get('/api/users/:address', async (req, res) => {
        const { address } = req.params;
        try {
            const user = await usersDAO.getUserByAddress(address);
            res.status(200).json(user);
        } catch (err) {
            res.status(200).json(err);
        }
    });
}

