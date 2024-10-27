import express from 'express'
import { adminRegister, adminLogin } from '../controller/adminAuthController.js'

import { allUserScore,userScoreUpdate  } from '../controller/adminDashBoard.js'
import { protect } from '../middleware/adminProtect.js'

const router = express.Router()

// User Registration
router.post('/register', adminRegister)

// User Login
router.post('/login', adminLogin)

// all users data
router.get('/all_user',protect, allUserScore)

//update score
router.put('/update_score/:id',protect, userScoreUpdate)
export default router