const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function initInstructor(app) {
    const instructorRoutes = express.Router();

    // route middleware verify a token
    instructorRoutes.use(async function (req, res, next) {
        try {
            const { data } = await axios.post(`http://${process.env.ENDPOINT}:3003/auth/verify`, {}, {
                headers: {
                    "x-access-token": req.headers['x-access-token'],
                    "x-access-username": req.headers['x-access-username'],
                    "x-access-device-id": req.headers['x-access-device-id']
                }
            })

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

    instructorRoutes.get('/', async (req, res) => {
        try {
            const { data } = await axios.get(`http://${process.env.ENDPOINT}:3002`);
            res.send(data);

        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    })

    instructorRoutes.post('/', async (req, res) => {
        try {
            const { data } = await axios.post(`http://${process.env.ENDPOINT}:3002`, {
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

    app.use('/instructor', instructorRoutes);
}