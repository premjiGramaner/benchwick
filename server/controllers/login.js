var btoa = require('btoa');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../global_keys')

const { User } = require("../models");
const { encryptPassword, validatePassword, response, getDatesObj, errorLogger, sendEmail, uuid } = require('../helper/utils')

const login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        if (!userName || userName.length < 3) {
            response({ res, code: 400, data: { userInfo: null }, message: 'User name is Invalid!' })
        } else if (!password || password.length < 3) {
            response({ res, code: 400, data: { userInfo: null }, message: 'Password is Invalid!' })
        } else {
            const userData = await User.getUserByUserEmail(userName)
            if (userData?.dataValues) {
                const isUserValid = await validatePassword(password, userData.dataValues.password)
                if (isUserValid) {
                    const user_info = {
                        id: userData.dataValues.id,
                        uuid: userData.dataValues.identifier,
                        name: userData.dataValues.name,
                        email: userData.dataValues.email,
                        role: userData.dataValues.role
                    };

                    let tokenReq = {
                        expire: new Date(moment().add(4, "hours")).getTime(),
                        canUpdateToken: new Date(moment().add(200, "minutes")).getTime(),
                        user_info: user_info,
                    }

                    const token = jwt.sign(tokenReq, JWT_SECRET_KEY);
                    response({ res, code: 200, data: user_info, optionalData: { user_token: token }, message: 'User Logged in Successfully!' })
                } else {
                    response({ res, code: 400, data: { userInfo: null }, message: 'Password is Invalid!' })
                }
            } else {
                response({ res, code: 400, data: { userInfo: null }, message: 'Username is Invalid!' })
            }
        }
    } catch (e) {
        errorLogger(next, 'image/login', e)
    }
};

const signUp = async (req, res, next) => {
    try {
        const { email, name, password, role } = req.body;
        if (email && name && password) {
            const isUserUnique = await User.getUserByUserEmail(email),
                encPass = await encryptPassword(password);
            if (!isUserUnique) {
                const userObj = {
                    email: email,
                    name: name,
                    identifier: uuid(),
                    password: encPass,
                    role: role || 'user',
                    ...(getDatesObj() || {})
                }

                const createRequest = await User.createUser(userObj);
                response({ res, code: 200, data: { user: createRequest }, message: 'User created Successfully!' })
            } else {
                response({ res, code: 400, data: { user: false }, message: 'User email already exists!' })
            }
        } else {
            response({ res, code: 400, data: { user: null }, message: 'User form is not valid!' })
        }
    } catch (e) {
        errorLogger(next, 'image/createUserInfo', e)
    }
};

const forgotPassword = async (req, res, next) => {
    const { email, redirect_URL } = req.body;
    try {
        const isUserValid = await User.getUserByUserEmail(email)
        if (isUserValid) {
            let tokenReq = {
                id: isUserValid.dataValues.id,
                name: isUserValid.dataValues.name,
                email: email
            }

            const token = jwt.sign(tokenReq, JWT_SECRET_KEY);
            const userToken = btoa(`${token}`);
            await sendEmail(email, `${redirect_URL}?token=${userToken}`)
            response({ res, code: 200, data: { status: userToken, token: token }, message: 'Password update request sent to the Email.' })
        } else {
            response({ res, code: 400, data: { status: null }, message: 'User is invalid!' })
        }
    } catch (e) {
        errorLogger(next, 'image/passwordUpdate', e)
    }
};

const passwordUpdate = async (req, res, next) => {
    const { user_id, password } = req.body;
    try {
        if (user_id && password) {
            const encPass = await encryptPassword(password);
            const updateRequest = User.updateUser(encPass);
            response({ res, code: 200, data: { status: updateRequest }, message: 'Password updated Successfully!' })
        } else {
            response({ res, code: 400, data: null, message: 'UserId or password is not valid!' })
        }
    } catch (e) {
        errorLogger(next, 'image/passwordUpdate', e)
    }
};

module.exports = {
    login,
    signUp,
    forgotPassword,
    passwordUpdate
};