const express = require('express');
const router = express.Router();

const {
    login,
    getUserInfo
} = require('../controllers/login')

router.post("/image-envision", login);
router.post("/save-envision", login);
router.post("/get-envision-variants/:id", getUserInfo);

module.exports = router;
