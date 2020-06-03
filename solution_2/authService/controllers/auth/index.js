const express = require('express');
const uniqid = require('uniqid');

const jwt = require('jsonwebtoken');
const Session = require('../../models/session');
const User = require('../../models/user');

const verifyToken = require('../../utils/verifyToken');

module.exports = function initAuth(app) {
    const authRoutes = express.Router();

    authRoutes.post('/register', function (req, res) {
        // create a sample user
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            admin: req.body.isAdmin
        });
        // save the sample user
        user.save(function (err) {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: err.message
                });
            }

            console.log('User saved successfully');
            res.json({ success: true });
        });
    });

    // TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
    // TODO: route middleware to verify a token
    authRoutes.post('/login', function (req, res) {
        // find the user
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: err.message
                });
            }
            if (!user) {
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else if (user) {
                if (user.password != req.body.password) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    if (!req.body.deviceId) {
                        res.json({
                            success: false,
                            message: 'Authentication failed. Device ID not found.'
                        });
                    } else {
                        const payload = {
                            admin: user.admin,
                            username: user.username
                        };
                        const secretKey = uniqid();
                        const sess = {
                            username: req.body.username,
                            deviceId: req.body.deviceId,
                            admin: user.admin,
                            secret: secretKey
                        };
                        Session.findOneAndUpdate({
                            username: req.body.username,
                            deviceId: req.body.deviceId
                        }, sess, { upsert: true }, function (err, res) {
                            if (err) throw err;

                            console.log('Session saved successfully');
                        });

                        var token = jwt.sign(payload, secretKey, {
                            expiresIn: 1440 // expires in 24 hours
                        });

                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    }
                }
            }
        });
    });

    // route middleware verify a token
    authRoutes.use(function (req, res, next) {
        verifyToken(req, res, next);
    });

    // route to verify a token
    authRoutes.post("/verify", function (req, res) {
        verifyToken(req, res);
    });

    // route to show a random message (GET http://localhost:8080/api/)
    authRoutes.post('/logout', function (req, res) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var deviceId = req.body.deviceId || req.query.deviceId || req.headers['x-access-device-id'];
        var username = req.body.username || req.query.username || req.headers['x-access-username'];
        // decode token
        if (token && deviceId && username) {
            // remove session key on db
            Session.find({ "deviceId": deviceId, "username": username }).remove().exec(function (err, data) {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: err.message
                    });
                }

                return res.status(200).send({
                    success: true,
                    message: ''
                });
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    // apply the routes to our application with the prefix /api
    app.use('/auth', authRoutes);
}