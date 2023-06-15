import {dirname} from 'path'
import {fileURLToPath} from 'url'
import multer from 'multer'


export const __dirname = dirname(fileURLToPath(import.meta.url))


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.fieldname === 'profileImage') {
            cb(null,__dirname + '/public/files/profiles')
        } else if(file.fieldname === 'productImage') {
            cb(null, __dirname + '/public/files/products')
        } else if (file.fieldname === 'document') {
            cb(null, __dirname + '/public/files/documents')
        }
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const uploader = multer({storage})