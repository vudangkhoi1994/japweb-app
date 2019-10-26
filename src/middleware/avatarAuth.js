const multer = require('multer')
const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000 //1.000.000
    },
    fileFilter(req, file, cb) {
        const supportedFile = '\.(jpg|jpeg|png)$'
        if (!file.originalname.match(supportedFile)){ //if not jpg|jpeg|png
            return cb(new Error('File must be a jpg|jpeg|png'))
        }

        cb(undefined, true)
    }
})

avatarAuth = upload.single('avatar')

module.exports = avatarAuth
