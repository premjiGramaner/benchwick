const express = require('express');
const router = express.Router();

const { validateToken } = require('../middleware')

const loginRouter = require('./loginRouter');
const imageRouter = require('./imageRouter');
const userRouter = require('./userRouter');

/* Module routes prefix */
router.use('/login', loginRouter)
router.use('/image', validateToken, imageRouter)
router.use('/user', validateToken, userRouter)

module.exports = router;