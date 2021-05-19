import express from 'express'

import {
    getExperiences,
    createExperience,
    deleteExperience,
    likeExperience,
    unLikeExperience,
    getSingleExperience,
    commentOnExperience,
    saveExperience,
    unSaveExperience,
    likeComment,
    unLikeComment,
    deleteComment
} from '../controllers/experiences.js'

import verification from '../middleware/verification.js'
import auth from '../middleware/auth.js'



const router = express.Router()



router.get('/', getExperiences)

router.get('/:id', getSingleExperience)

router.post('/', auth, verification, createExperience)

router.delete('/:id', auth, verification, deleteExperience)

router.patch('/:id/save', auth, verification, saveExperience)

router.patch('/:id/unsave', auth, verification, unSaveExperience)

router.patch('/:id/like', auth, verification, likeExperience)

router.patch('/:id/unlike', auth, verification, unLikeExperience)

router.patch('/:id/comment', auth, verification,  commentOnExperience)

router.patch('/comment/like/:id', auth, verification, likeComment)

router.patch('/comment/unlike/:id', auth, verification, unLikeComment)

router.delete('/comment/delete/:id', auth, verification, deleteComment)





export default router