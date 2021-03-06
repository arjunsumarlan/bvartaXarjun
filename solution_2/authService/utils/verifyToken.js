const Session = require('../models/session');
const jwt = require('jsonwebtoken');

const verifyToken = function (req, res, callback) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var deviceId = req.body.deviceId || req.query.deviceId || req.headers['x-access-device-id'];
    var username = req.body.username || req.query.username || req.headers['x-access-username'];
    if (!deviceId) {
        return res.status(403).send({
            success: false,
            message: 'No Device ID provided.'
        });
    }
    if (!username) {
        return res.status(403).send({
            success: false,
            message: 'No Username provided.'
        });
    }
    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
    // get secret key on db
    var sess = Session.findOne({ "deviceId": deviceId, "username": username }, function (err, session) {
        if (err) {
            return res.status(200).json({ success: false, message: err.message });
        }

        if (session) {
            var secretKey = session.secret;
            // verifies secret and checks exp
            jwt.verify(token, secretKey, function (err, decoded) {
                if (err) {
                    return res.status(200).json({ success: false, message: err.message });
                }

                if (callback) {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    callback();
                } else {
                    return res.status(200).send({
                        success: true,
                        message: ''
                    });
                }
            });
        } else {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
    });
};

module.exports = verifyToken;