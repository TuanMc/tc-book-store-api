import multer from 'multer';
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, 'public/uploads');
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

const upload = multer({ storage });
export { upload };