const { Images } = require("../models");
const moment = require('moment');
const fs = require('fs');
const { getDatesObj, response, errorLogger } = require('../helper/utils');
const { imageList } = require("../helper/mockList");


const imageEnvision = async (req, res, next) => {
    try {
        const { variants } = req.body;
        const { image } = req.files;
        console.log('Save Envision', image, variants);

        if (!image) return res.sendStatus(400);
        if (!(/^image/.test(image.mimetype))) return res.status(400).send({ data: { info: null }, message: 'Image is Invalid!' })

        // Move the uploaded image to our upload folder
        image.mv(__dirname + '/upload/' + image.name);

        /* Mock list  */
        const finalImageList = [];
        imageList.forEach((element, index) => {
            if (index < variants) {
                finalImageList.push(element);
            }
        });

        response({
            res,
            code: 200,
            data: { info: finalImageList, variants: variants },
            message: 'Image variations generated successfully!'
        })
    } catch (e) {
        errorLogger(next, 'image/imageEnvision', e)
    }
};

const saveEnvision = async (req, res, next) => {
    const { name, variants, variantList } = req.body;
    const { image } = req.files;
    try {
        const envisionObj = {
            name: name,
            variants: variants,
            variant_list: variantList,
            original_url: "https://previews.123rf.com/images/weedezign/weedezign1503/weedezign150300696/38084134-plain-wood-texture-background.jpg",
            image_name: image.name,
            image_size: image.size,
            created_date: moment().format('DD/MM/YYYY'),
            created_time: moment().format('h:mm:ss'),
            ...(getDatesObj() || {})
        };

        const enableStauts = await Images.createHistory(envisionObj);
        response({
            res,
            code: 200,
            data: { status: enableStauts },
            message: 'Image variation saved successfully!'
        })
    } catch (e) {
        errorLogger(next, 'image/saveEnvision', e)
    }
};

const getEnvisionVariants = async (req, res, next) => {
    const { id } = req.params;
    try {
        const imageInfo = await Images.getImageByID(id);
        const responseInfo = {
            ...(imageInfo.dataValues || {}),
            variant_list: (imageInfo.dataValues && imageInfo.dataValues.variant_list) ? JSON.parse((imageInfo.dataValues.variant_list).slice(1, -1)) : []
        }
        response({
            res,
            code: 200,
            data: { imageVariant: (responseInfo || null) },
            message: 'get Image successfully!'
        })
    } catch (e) {
        errorLogger(next, 'image/getEnvisionVariants', e)
    }
};

module.exports = {
    imageEnvision,
    saveEnvision,
    getEnvisionVariants
};