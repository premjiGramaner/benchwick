const { User } = require("../models");

const getUserInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await User.getUserByID(id)
        res.status(200).send({ userInfo: data, message: 'User Info fetched Successfully!' })
    } catch (e) {
        next(e);
    }
};

const getUserHistory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await User.getUserByID(id)
        res.status(200).send({ userInfo: data, message: 'User history fetched Successfully!' })
    } catch (e) {
        next(e);
    }
};

const userLogout = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await User.getUserByID(id)
        res.status(200).send({ userInfo: data, message: 'User Logout Successfully!' })
    } catch (e) {
        next(e);
    }
};



module.exports = {
    getUserInfo,
    getUserHistory,
    userLogout
};