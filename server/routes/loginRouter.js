const express = require('express');
const router = express.Router();

const {
    login,
    authGoogle,
    signUp,
    forgotPassword,
    passwordUpdate
} = require('../controllers/login')

router.post("/", login);
router.post("/signup", signUp);
router.post("/google-signin", authGoogle);
router.post("/forgot-password", forgotPassword);
router.post("/password-update", passwordUpdate);

module.exports = router;
