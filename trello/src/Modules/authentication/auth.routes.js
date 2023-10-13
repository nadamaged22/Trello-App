import { Router } from "express";
import * as pc from './auth.controller.js'
import * as validators from '../authentication/validation.js'
import {validation} from '../../MidlleWare/validation.js'
const router=Router()

router.post('/signUP/:flag',validation(validators.signup),pc.signup)
router.get('/login',validation(validators.login),pc.Login)
router.get('/confirmEmail/:token',pc.confirmEmail)
router.get('/newConfirmEmail/:token',pc.newConfirmEmail)

export default router