const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('./user.model');

const validateJwt = expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] });

const signToken = (_id) => jwt.sign({ _id }, process.env.SECRET);

const findAndAssignUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(401).end();
        }
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};

const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser);

const Auth = {
    login: async (req, res) => {
        const { body } = req;
        try {
            const user = await User.findOne({ email: body.email });
            if (!user) {
                return res.status(401).send('User not found');
            }

            const isMatch = await bcrypt.compare(body.password, user.password);
            if (isMatch) {
                const signed = signToken(user._id);
                return res.status(200).send(signed);
            } else {
                return res.status(401).send('User and password are invalid');
            }
        } catch (e) {
            res.status(500).send(e.message);
        }
    },
    register: async (req, res) => {
        const { body } = req;
        try {
            const isUser = await User.findOne({ email: body.email });

            if (isUser) {
                return res.status(400).send("User already exists"); // Usar código 400 para un usuario existente
            } else {
                const salt = await bcrypt.genSalt();
                const hashed = await bcrypt.hash(body.password, salt);
                const user = await User.create({ email: body.email, password: hashed, salt });
                const signed = signToken(user._id);

                return res.status(201).send(signed); // Código 201 para creación exitosa
            }
        } catch (e) {
            res.status(500).send(e.message);
        }
    },
};

module.exports = { Auth, isAuthenticated };
