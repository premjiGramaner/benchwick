const express = require('express');
const router = express.Router();

const {
    login,
    getUserInfo
} = require('../controllers/login')

router.post("/", login);
router.post("/signup", getUserInfo);
router.post("/forgot-password", getUserInfo);
router.post("/password-update", getUserInfo);

module.exports = router;
