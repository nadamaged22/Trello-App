import { Router } from "express";
const router=Router()
import * as pc from './user.controller.js'
import { auth } from "../../MidlleWare/authenticate.js";
import { FileUpload, FileValidation } from "../../utils/MulterCloudinary.js";
import * as validators from '../user/validation.js'
import {validation} from '../../MidlleWare/validation.js'

router.put('/changepass',validation(validators.ChangePassword),auth,pc.ChangePassword)
router.patch('/updateuser',validation(validators.updateuser),auth,pc.updateuser)
router.delete('/deleteuser/:_id',auth,pc.deleteuser)
router.get('/logout',auth,pc.logout)
router.patch('/profilepic',auth,
FileUpload(FileValidation.image).single('image'),
pc.UpdateProfilePic)
router.patch('/coverpic',auth,
FileUpload(FileValidation.image).array('image',5),
pc.UpdateCoverPhoto)





export default router