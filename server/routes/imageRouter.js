const express = require('express');
const router = express.Router();

const {
    imageEnvision,
    saveEnvision,
    getEnvisionVariants
} = require('../controllers/image')

router.post("/image-envision", imageEnvision);
router.post("/save-envision", saveEnvision);
router.get("/get-envision-variants/:id", getEnvisionVariants);

module.exports = router;
