import { Router } from "express";
const router=Router()
import * as pc from './task.controller.js'
import { auth } from "../../MidlleWare/authenticate.js";
import * as validators from '../task/validation.js'
import {validation} from '../../MidlleWare/validation.js'

router.post('/addtask',validation(validators.addtask),auth,pc.addtask)
router.patch('/updatetask/:_id',validation(validators.updatetask),auth,pc.updatetask)
router.delete('/delete/:_id',auth,pc.deletetask)
router.get('/getall/',auth,pc.getalltasks)
router.get('/getuser/',auth,pc.getusertasks)
router.get('/getuserwithid/:_id',auth,pc.getusertaskswithid)
router.get('/getnotdone/',auth,pc.tasksnotdone)

export default router