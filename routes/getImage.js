const express = require('express');
const UploadSchema = require('../models/Upload')

const router = express.Router();

router.get('/', async (req, res) => {

    const getImages = await UploadSchema.find();

    if (!getImages) {
        return res.status(404).json({ message: "No Images Found" });
    }
    else {
        // const base64Data = getImages.map((element) => {
        //     return (
        //         {
        //             id: element._id,
        //             title : element.title,
        //             description : element.description,
        //             base64String : Buffer.from(element.pic.data.buffer, 'binary').toString('base64'),
        //             imageType: element.pic.contentType
        //         }
        //     )
        // })
        res.send(getImages)

        // console.log(getImages)
        // res.send(getImages)
        // return res.status(200).json({ getImages });
    }
})

module.exports = router;