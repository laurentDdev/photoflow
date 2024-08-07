const multer = require('multer');
const {nanoid} = require('nanoid');

const multerConfig = (folder) => {
    return storage = multer.diskStorage({
        destination: (req, file, callback) => {

            callback(null, `src/public/assets/${folder}`);
        },
        filename: (req, file, callback) => {
            const name = nanoid()
            callback(null, name+".png")
        }
    })
}

module.exports = multerConfig;