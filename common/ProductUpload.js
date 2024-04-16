const multer = require('multer');
const path = require("path");

const ProductUpload=()=>{
    try{
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'productFiles/');
            },
            filename: function (req, file, cb) {
                console.log("file",file)
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
                cb(null, file.fieldname + '-' + uniqueSuffix);
            }
        });
        console.log("storage",storage)
        const upload= multer({
            storage: storage,
            limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
        }).single('image');
        return upload  
    }
    catch(err){
        console.log("err123",err)
    }
    
    // console.log("upload",upload)
}

module.exports = ProductUpload;
