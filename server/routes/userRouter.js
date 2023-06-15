const express = require('express');
const router = express.Router();

const {
    getUserInfo,
    getUserHistory,
    userLogout
} = require('../controllers/user')

router.get("/self", getUserInfo);
router.get("/user-history", getUserHistory);
router.get("/logout", userLogout);

module.exports = router;
