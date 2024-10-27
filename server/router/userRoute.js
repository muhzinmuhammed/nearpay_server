import express from 'express'
import { userRegister, userLogin } from '../controller/userAuthController.js'
import {userScore,userScoreUpdate} from '../controller/userScoreController.js'
import { protect } from '../middleware/userProtect.js'

const router = express.Router()

// User Registration
router.post('/register', userRegister)

// User Login
router.post('/login', userLogin)

//user score 

router.get('/score/:id',protect, userScore)


//user score update
router.put('/update_score/:id', protect,userScoreUpdate)

export default router