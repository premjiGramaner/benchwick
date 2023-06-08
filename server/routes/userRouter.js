const express = require('express');
const router = express.Router();

const {
    login,
    getUserInfo
} = require('../controllers/login')

router.get("/self", login);
router.get("/user-history", getUserInfo);
router.get("/logout", getUserInfo);

module.exports = router;
