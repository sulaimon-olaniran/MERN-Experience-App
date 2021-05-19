import jwt from 'jsonwebtoken'
import dotnev from 'dotenv'
import User from '../models/user.js'





dotnev.config()





const { JWT_SECRET } = process.env



//MIDDLEWARE TO CHECK IF USER'S EMAIL AS BEEN VERIFIED AND TO GUIDE ROUTES FROM UNVERIFIED EMAIL ADDRESSES

const auth = (req, res, next) => {

    const token = req.header('x-auth-token')

    const decoded = jwt.verify(token, JWT_SECRET)

    const { id } = decoded


    User.findById(id)
        .then(user => {

            if (!user.isVerified) return res.status(401).json({ "message": "Unauthorized, please verify your email address." })

            next()
        })
        .catch((error) => {

            return res.status(409).json({ "message": "Authorization error", error })
        })



}


export default auth