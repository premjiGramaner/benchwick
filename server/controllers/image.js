const { Images } = require("../models"), axios = require('axios'), FormData = require('form-data');
const moment = require('moment');
const fs = require('fs');
const { getDatesObj, response, errorLogger, validatePath, formatImageCollection, getTypeFromURL, uuid_key } = require('../helper/utils');
const { queueCompleted } = require("./sockets");

const imgPath = 'varients-images/', tmp_path = 'varients-generated/';


const imageEnvision = async (req, res, next) => {
    try {
        const { variants, uuid, imageId, mockError = false } = req.body;
        if (req.files && variants) {
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

            let finalImageList = [], isError = false;
            const headers = {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data`,
                }
            };

            axios.post(`http://localhost:8000/regenerate_images/?num_images=${variants}&use_sd=true`, formData, headers)
                .then((response) => {
                    console.log('Python Response count', (response.data || []).length)
                    finalImageList.push(...(response.data || []))
                    return finalImageList;
                })
                .catch(function (error) {
                    console.log('** Python Response error', error)
                    // handle error
                    isError = { message: error?.response?.data?.detail || true, code: error?.response?.status };
                }).finally(function (_respose) {
                    console.log('Python Response finally', finalImageList.length)
                    if (isError) {
                        queueCompleted(uuid, { info: [], variants: variants, imageId }, isError);

                        if (mockError) {
                            return response({
                                res,
                                code: 200, // 501,
                                data: {
                                    info: [
                                        {
                                            image_url: (`${path}01_.jpg`),
                                            key: uuid_key()
                                        },
                                        {
                                            image_url: (`${path}02_.jpg`),
                                            key: uuid_key()
                                        },
                                        {
                                            image_url: (`${path}03_.jpg`),
                                            key: uuid_key()
                                        },
                                        {
                                            image_url: (`${path}04_.jpg`),
                                            key: uuid_key()
                                        },
                                        {
                                            image_url: (`${path}05_.jpg`),
                                            key: uuid_key()
                                        },
                                        {
                                            image_url: (`${path}06_.jpg`),
                                            key: uuid_key()
                                        },
                                        {
                                            image_url: (`${path}07_.jpg`),
                                            key: uuid_key()
                                        },
                                        {
                                            image_url: (`${path}08_.jpg`),
                                            key: uuid_key()
                                        },
                                        {
                                            image_url: (`${path}09_.jpg`),
                                            key: uuid_key()
                                        }
                                    ],
                                    variants: variants, error: isError
                                },
                                message: 'Image variations generate Failed!'
                            })
                        } else {
                            response({
                                res,
                                code: 501,
                                data: { info: [], variants: variants, imageId, error: isError },
                                message: 'Image variations generate Failed!'
                            })
                        }

                    } else {
                        formatImageCollection(finalImageList, imageName, path).then((finalList) => {
                            queueCompleted(uuid, { info: finalList, variants: variants, imageId });
                            response({
                                res,
                                code: 200,
                                data: { info: finalList, variants: variants, imageId },
                                message: 'Image variations generated successfully!'
                            })
                        });
                    }
                });
        } else {
            return res.status(400).send({ data: { info: null }, message: 'Image is Invalid!' })
        }
    } catch (e) {
        console.log('e', e)
        errorLogger(next, 'image/imageEnvision', e)
    }
};


// store the selected files into server
const saveEnvision = async (req, res, next) => {
    const { name, variants, variantList } = req.body;
    const { image } = req.files;
    const { tokenInfo } = res.locals || {};

    try {
        const envisionObj = {
            name: name,
            identifier: uuid_key(),
            variants: variants,
            variant_list: [],
            original_url: "",
            image_name: image.name,
            image_size: image.size,
            isActive: 'true',
            create_by: tokenInfo.user_info.id,
            created_date: moment().format('DD/MM/YYYY'),
            created_time: moment().format('h:mm:ss'),
            ...(getDatesObj() || {})
        };

        const path = await validatePath(imgPath + (tokenInfo.user_info || { uuid: 'default_001' }).uuid + '/' + name + '/');
        const imageName = (`original_image${getTypeFromURL(image.name)}`)
        image.mv(path + imageName);
        envisionObj.original_url = (path + imageName);

        JSON.parse(variantList).forEach(async (item, index) => {
            const image_path = path + (`variant_${index + 1}`) + getTypeFromURL(item.image_url);
            envisionObj.variant_list.push({
                key: item.key,
                image_url: image_path
            })

            fs.createReadStream(item.image_url).pipe(fs.createWriteStream(image_path));
        })

        envisionObj.variant_list = JSON.stringify(envisionObj.variant_list)
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
            variant_list: (imageInfo.dataValues && imageInfo.dataValues.variant_list) ? JSON.parse(imageInfo.dataValues.variant_list) : []
        }

        response({
            res,
            code: 200,
            data: { imageVariant: (responseInfo || null) },
            message: 'get Image successfully!'
        })
    } catch (e) {
        console.log('e', e)
        errorLogger(next, 'image/getEnvisionVariants', e)
    }
};

module.exports = {
    imageEnvision,
    saveEnvision,
    getEnvisionVariants
};