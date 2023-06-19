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

const getUserHistory = async (req, res, next) => {
    try {
        const id = (res.locals.tokenInfo && res.locals.tokenInfo.user_info) ? res.locals.tokenInfo.user_info.id : "";
        const role = (res.locals.tokenInfo && res.locals.tokenInfo.user_info) ? res.locals.tokenInfo.user_info.role : "";

        let data = null;
        if (role === 'admin') {
            data = await Images.getHistoryByAdmin(id)
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
    userLogout
};