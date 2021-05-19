import jwt from 'jsonwebtoken'
import dotnev from 'dotenv'





dotnev.config()





const { JWT_SECRET } = process.env



const auth = (req, res, next) => {
   
    const token = req.header('x-auth-token')
    

    if (!token) return res.status(401).json({ "message": "Unauthorized, Please Log In" })

    try {

        const decoded = jwt.verify(token, JWT_SECRET)

        req.user = decoded

        next()
        
    } catch (error) {
        
        res.status(409).json({ "message" : "Token is not valid", error })
    }
}


export default auth