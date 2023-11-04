import multer from 'multer'

const storage: multer.StorageEngine = multer.diskStorage({
    destination(req: any, file: any, cb: any){
        cb(null, 'files/books')
    },
    filename(req: any, file: any, cb: any) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export default multer({storage})