import multer from 'multer'
export const FileValidation={
    image:['image/jpeg','image/png','image/gif'],
    file:['application/pdf','application/msword']
}
export function FileUpload(customValidation=[]){
    const storage=multer.diskStorage({})
    function FileFilter(req,file,cb){
        if(customValidation.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error("INVALID_FORMAT"),false)
        }
    }
    const upload=multer({FileFilter,storage})
    return upload
}