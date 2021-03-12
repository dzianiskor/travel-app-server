const {Router} = require('express')
const router = Router()
const multer = require('multer')
const fs = require("fs")
const User = require('../models/User')

const auth = require('../middleware/auth.middleware')

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        fs.mkdir('./uploads/',(err)=>{
            callBack(null, './uploads/');
        });
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + `${file.originalname}`)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({storage, fileFilter})

router.post('/avatar', auth, upload.single('file'), async (req, res, next) => {
    const file = req.file
    let avatarPath = req.protocol + '://' + req.headers.host + '/' + file.filename
    if (!file) {
        return res.status(400).json({message: 'No File'})
    }
    const user = await User.findById(req.user.userId)
    user.avatar = avatarPath
    await user.save()

    return res.send(avatarPath);
})

module.exports = router
