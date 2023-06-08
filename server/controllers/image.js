const { User } = require("../models");

const imageEnvision = async (req, res, next) => {
    const { } = req.body;
    try {
        res.status(400).send({ userInfo: null, message: '' })
    } catch (e) {
        next(e);
    }
};

const saveEnvision = async (req, res, next) => {
    const { } = req.body;
    try {
        res.status(400).send({ userInfo: null, message: '' })
    } catch (e) {
        next(e);
    }
};

const getEnvisionVariants = async (req, res, next) => {
    const { id } = req.params;
    try {
        res.status(400).send({ userInfo: null, message: '' })
    } catch (e) {
        next(e);
    }
};

module.exports = {
    imageEnvision,
    saveEnvision,
    getEnvisionVariants
};