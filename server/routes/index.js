const express = require('express');
const router = express.Router();

const loginRouter = require('./loginRouter');
const imageRouter = require('./imageRouter');
const userRouter = require('./userRouter');

/* Module routes prefix */
router.use('/login', loginRouter)
router.use('/image', imageRouter)
router.use('/user', userRouter)

module.exports = router;