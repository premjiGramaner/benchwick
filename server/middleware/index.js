const jwt = require('jsonwebtoken');
const { response } = require('../helper/utils');
const { JWT_SECRET_KEY } = require('../global_keys')

const validateToken = (req, res, next) => {

    try {
        if (req.headers['authorization'] || req.headers['Authorization']) {
            let token = (req.headers['authorization'] || req.headers['Authorization']).toString().replace(/^Bearer\s+/, "");
            const verified = jwt.verify(token, JWT_SECRET_KEY);
            if (verified) {
                var decoded = jwt.decode(token);
                res.locals.tokenInfo = decoded;

                return next();
            }
        }

        return response({ res, code: 401, data: { error: null }, message: 'Un Authorised accees, Token not valid!' });
    } catch (error) {
        return res.status(401).send(error);
    }
};


module.exports = {
    validateToken
}