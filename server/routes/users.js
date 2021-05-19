import express from 'express'

import {
    createUser,
    authenticateUser,
    getLoggedInUser,
    getSingleUser,
    updateUser,
    deleteUser,
    verifyUserEmail,
    sendVerificationCode
} from '../controllers/users.js'
import auth from '../middleware/auth.js'



const router = express.Router()


router.post('/', createUser)

router.post('/auth', authenticateUser)

router.get('/:id', getSingleUser)

router.get('/auth/user', auth, getLoggedInUser)

router.patch('/update/user', auth, updateUser)

router.patch('/email/verification', auth, verifyUserEmail)

router.patch('/verification/code', auth, sendVerificationCode)

router.delete('/delete/user', auth, deleteUser)



export default router