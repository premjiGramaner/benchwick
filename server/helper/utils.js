/* Password section */
const bcrypt = require("bcrypt")
const moment = require('moment');
const nodemailer = require('nodemailer');
const { HASH_SALT_ROUND, DEBUGGER_MODE } = require('../global_keys')
const { template } = require('./email_template');

const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt
            .hash(password, HASH_SALT_ROUND)
            .then((hash) => {
                if (DEBUGGER_MODE) console.log('**** encryptPassword Hash ****', hash)
                resolve(hash);
            })
            .catch(err => reject(err.message))
    })
};

function validatePassword(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt
            .compare(password, hash)
            .then((res) => resolve(res))
            .catch((err) => reject(err.message))
    })
}

function errorHandler(err, req, res, next) {
    if (DEBUGGER_MODE) {
        console.log('********* Middleware error **********', err);
        console.log('----------------------------------------------------------');
    }
    if (typeof (err) === 'string') {
        return res.status(200).json({ message: err, success: false });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token', success: false });
    }

    if (err.hasOwnProperty('data')) {
        return res.status(200).json({ message: err.message, data: err.data, success: false });
    } else {
        return res.status(500).json({ message: err.message, data: err.body || err, type: err.type || null, success: false });
    }
}

const errorLogger = (next, path, error, isDebug) => {
    const logState = (isDebug) ? 'Debug' : 'Error occured';
    if (DEBUGGER_MODE) {
        console.log('')
        console.log(`---- ${logState} Begin ----`)
        console.log(`${logState} in ${path}: `, convertCircular(error));
        console.log(`---- ${logState} End ----`)
        console.log('')
    }

    return next(error)
}

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};


const convertCircular = (data) => {
    return JSON.stringify(data, getCircularReplacer())
}

const response = ({ res, code, data, optionalData, message }) => {
    return res.status(code).send({ statusCode: code, data: { ...data, ...(optionalData || {}) }, message: message });
}

const sendEmail = (sendTo, token) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'premkumar1528@gmail.com',
                pass: 'arwyzhmkiixeauxz'
            }
        });

        const mailOptions = {
            from: 'dev@envision.style',
            to: sendTo,
            subject: 'Envision: Password reset',
            html: template.replace('{url}', token)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                if (DEBUGGER_MODE) console.log(error);
                reject(error)
            } else {
                if (DEBUGGER_MODE) console.log('Email sent: ' + info.response);
                resolve(true)
            }
        });
    })
}

const uuid_key = (length = 6) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }

    return result;
}

const getDatesObj = () => {
    return ({
        created_on: moment().format(),
        updated_on: moment().format()
    })
}

module.exports = {
    encryptPassword,
    convertCircular,
    errorLogger,
    validatePassword,
    errorHandler,
    sendEmail,
    uuid_key,
    getDatesObj,
    response
};