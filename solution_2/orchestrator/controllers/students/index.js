const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function initStudent(app) {
    const studentRoutes = express.Router();

    // route middleware verify a token
    studentRoutes.use(async function (req, res, next) {
        try {
            const { data } = await axios.post(`http://${process.env.ENDPOINT}:3003/auth/verify`, {}, {
                headers: {
                    "x-access-token": req.headers['x-access-token'],
                    "x-access-username": req.headers['x-access-username'],
                    "x-access-device-id": req.headers['x-access-device-id']
                }
            });

            if (data) {
                next();
            }

        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    });

    studentRoutes.get('/', async (req, res) => {
        try {
            const { data } = await axios.get(`http://${process.env.ENDPOINT}:3001`)
            res.send(data);

        } catch (err) {
            res.send({
                success: false,
                message: err.message
            });
        }
    })

    studentRoutes.post('/', async (req, res) => {
        try {
            const { data } = await axios.post(`http://${process.env.ENDPOINT}:3001`, {
                name: req.body.name
            });

            res.send(data)

        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    })

    app.use('/student', studentRoutes);
}