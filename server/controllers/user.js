const { User, Images } = require("../models");
const { response, errorLogger } = require("../helper/utils");

const getUserInfo = async (req, res, next) => {
    try {
        const id = (res.locals.tokenInfo && res.locals.tokenInfo.user_info) ? res.locals.tokenInfo.user_info.id : "";
        const data = await User.getUserByID(id)
        if (data) {
            response({ res, code: 200, data: { userInfo: data }, message: 'User Info fetched Successfully.' })
        } else {
            response({ res, code: 400, data: { userInfo: null }, message: "User doesn't exist!" })
        }
    } catch (e) {
        errorLogger(next, 'user/getUserInfo', e)
    }
};

const deleteUserHistory = async (req, res, next) => {
    try {
        const imageID = (req.params ? req.params.id : '');
        const role = (res.locals.tokenInfo && res.locals.tokenInfo.user_info) ? res.locals.tokenInfo.user_info.role : "";

        let data = null;
        if (role === 'admin') {
            data = await Images.deleteHistory(imageID)
        } else {
            data = await Images.softDeleteHistory(imageID)
        }

        response({ res, code: 200, data, message: 'User history deleted successfully.' })
    } catch (e) {
        errorLogger(next, 'user/deleteUserHistory', e)
    }
};

const getUserHistory = async (req, res, next) => {
    try {
        const id = (res.locals.tokenInfo && res.locals.tokenInfo.user_info) ? res.locals.tokenInfo.user_info.id : "";
        const role = (res.locals.tokenInfo && res.locals.tokenInfo.user_info) ? res.locals.tokenInfo.user_info.role : "";

        let data = null;
        if (role === 'admin') {
            data = await Images.getHistoryByAdmin()
        } else {
            data = await Images.getByUserID(id)
        }

        response({ res, code: 200, data: { imageList: data }, message: 'User history fetched successfully.' })
    } catch (e) {
        errorLogger(next, 'user/getUserHistory', e)
    }
};

const userLogout = async (req, res, next) => {
    try {
        res.status(200).send({ status: null, message: 'User Logged out successfully.' })
    } catch (e) {
        errorLogger(next, 'user/userLogout', e)
    }
};



module.exports = {
    getUserInfo,
    getUserHistory,
    deleteUserHistory,
    userLogout
};