const { Images } = require("../models"), axios = require('axios'), FormData = require('form-data');
const moment = require('moment');
const fs = require('fs');
const { getDatesObj, response, errorLogger, validatePath, formatImageCollection, getTypeFromURL } = require('../helper/utils');

const imgPath = 'resources/', tmp_path = 'varients-generated/';


const imageEnvision = async (req, res, next) => {
    try {
        const { variants } = req.body;
        const { image } = req.files;
        const { tokenInfo } = res.locals || {};
        if (!image) return res.sendStatus(400);
        if (!(/^image/.test(image.mimetype))) return res.status(400).send({ data: { info: null }, message: 'Image is Invalid!' })

        const path = await validatePath(tmp_path + (tokenInfo.user_info || { uuid: 'default_001' }).uuid + '/');
        const imageName = (`default_image${getTypeFromURL(image.name)}`)
        // Move the original image to our temp folder
        image.mv(path + imageName);

        const formData = new FormData();
        formData.append('file', fs.createReadStream(path + imageName), imageName)

        console.log('** formData', formData, imageName, path + imageName)
        let finalImageList = [], isError = false;
        const headers = {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data`,
            }
        };

        axios.post(`http://localhost:8000/regenerate_images/?num_images=${variants}&use_sd=true`, formData, headers)
            .then((response) => finalImageList.push(...(response.data || [])))
            .catch(function (error) {
                // handle error
                console.log('********')
                console.log('image/imageEnvision:42', error.response)
                console.log('********')
                isError = { message: error.response.data.detail, code: error.response.status };
            }).finally(function () {
                if (isError) {
                    response({
                        res,
                        code: 501,
                        data: { info: [], variants: variants, error: isError },
                        message: 'Image variations generate Failed!'
                    })
                } else {
                    formatImageCollection(finalImageList, imageName, path).then((finalList) => {
                        response({
                            res,
                            code: 200,
                            data: { info: finalList, variants: variants },
                            message: 'Image variations generated successfully!'
                        })
                    });
                }
            });
    } catch (e) {
        console.log('e', e)
        errorLogger(next, 'image/imageEnvision', e)
    }
};


// store the selected files into server
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
            isActive: 'true',
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