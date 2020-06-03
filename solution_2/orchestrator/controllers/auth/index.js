const express = require('express');
const axios = require('axios');

module.exports = function initAuth(app) {
    const authRoutes = express.Router();

    authRoutes.post('/register', async (req, res) => {
        try {
            const { data } = await axios.post('http://10.5.50.135:3003/auth/register', {
                username: req.body.username,
                password: req.body.password,
                admin: req.body.isAdmin
            })

            res.send(data)

        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    });

    authRoutes.post('/login', async (req, res) => {
        try {
            const { data } = await axios.post('http://10.5.50.135:3003/auth/login', {
                username: req.body.username,
                password: req.body.password,
                deviceId: req.body.deviceId
            })

            res.send(data)

        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    });

    authRoutes.post('/logout', async (req, res) => {
        try {
            const { data } = await axios.post('http://10.5.50.135:3003/auth/logout', {
                username: req.body.username,
                password: req.body.password,
                deviceId: req.body.deviceId
            })

            res.send(data)

        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    });

    // apply the routes to our application with the prefix /api
    app.use('/auth', authRoutes);
}