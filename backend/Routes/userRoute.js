import express from 'express'

const router  = express.Router()
import { signUp,logIn,logOut, authMiddleware, addText, getText,getRefreshToken } from '../Controllers/userController.js';



router.post('/signup',signUp);
router.post('/login',logIn);
router.post('/logout',logOut);
router.post('/addtext',authMiddleware,addText);
router.get('/gettext',authMiddleware,getText);
router.post('/refresh-token',getRefreshToken)


export default router