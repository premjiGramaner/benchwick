const express = require('express');
const router = express.Router();

const {
    getUserInfo,
    getUserHistory,
    userLogout,
    deleteUserHistory
} = require('../controllers/user')

router.get("/self", getUserInfo);
router.get("/user-history", getUserHistory);
router.delete("/delete-history/:id", deleteUserHistory);
router.get("/logout", userLogout);

module.exports = router;
