const { User } = require("../models");

const login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        
        res.status(400).send({ userInfo: null, message: 'username and password is Invalid' })
    } catch (e) {
        next(e);
    }
};

const signUp = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        res.status(400).send({ userInfo: null, message: 'username and password is Invalid' })
    } catch (e) {
        next(e);
    }
};

const forgotPassword = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        res.status(400).send({ userInfo: null, message: 'username and password is Invalid' })
    } catch (e) {
        next(e);
    }
};

const passwordUpdate = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        res.status(400).send({ userInfo: null, message: 'username and password is Invalid' })
    } catch (e) {
        next(e);
    }
};

module.exports = {
    login,
    signUp,
    forgotPassword,
    passwordUpdate
};