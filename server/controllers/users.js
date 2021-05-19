import User from '../models/user.js'
import Experience from '../models/experience.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Pusher from 'pusher'
import dotnev from 'dotenv'
import nodemailer from 'nodemailer'





dotnev.config()





const { JWT_SECRET, PUSHER_SECRET, EMAIL_ADDRESS, EMAIL_ADDRESS_PASSWORD } = process.env





const pusher = new Pusher({
    appId: "1191988",
    key: "249f2df25e3d65b17fd7",
    secret: PUSHER_SECRET,
    cluster: "mt1",
    useTLS: true,
})




//FOR SENDING EMAIL VERIFICATION CODE TO CLIENT'S EMAIL.

const sendEmail = (email, code) => {
    

    const Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: EMAIL_ADDRESS,
            pass: EMAIL_ADDRESS_PASSWORD
        }
    })

    const mailData = {
        from: 'no-reply@os-experience.netlify.app',
        to: email,
        subject: "Email Confirmation Code",
        text: 'Hello,\n\n' + 'Please verify your account with the following code: ' + code
    }

    Transport.sendMail(mailData, (error, response) => {
        if (error) return console.log(error)
        
    })
}






//SIGNING UP/ADDING NEW USER TO THE DATABASE

export const createUser = (req, res) => {
    
    const { firstName, lastName, email, password, confirmPassword } = req.body


    //returns 6 random digits
    const verificationCode = (Math.floor(100000 + Math.random() * 900000))


    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ "message": "Please enter all fields" })
    }

    if (password !== confirmPassword) return res.status(404).json({ "message": "Password and confirm password don't match" })

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ "message": "User already exists" })

            const newUser = new User({
                firstName,
                lastName,
                email,
                password,
                verificationCode, //verification code saved to user's data so as to use for email confirmation later
                isVerified: false,
            })

            
            //hasing user's password before saving it to user's data in the database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {

                    if (err) return res.status(500).json({ "message": "Server Error From BCRYPT", err })

                    newUser.password = hash

                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                JWT_SECRET,

                                (err, token) => {
                                    console.log(err)
                                    if (err) throw err

                                    res.status(200).json({
                                        token,
                                        user,
                                    })

                                    //sending same verification code saved to user's data to the user's email so user can verify email with the code
                                    sendEmail(user.email, verificationCode)
                                }
                            )

                        })

                })

            })
        })
        .catch(error => {
            return res.status(404).json({ "message": "Failed to create account", error })
        })
}









//VERIFYING THE USER'S EMAIL

export const verifyUserEmail = (req, res) => {
    const { id } = req.user
    const { verificationCode } = req.body

    if (!verificationCode) return res.status(400).json({ "message": "Please enter the verification code" })

    User.findById(id).select("+verificationCode")
        .then(user => {
            if (!user) return res.status(404).json({ "message": "User does not exist" })

            if (!user.verificationCode) return res.status(404).json({ "message": "Code already expired, resend another code." })

            //checking if verification codes match by subtracting i.e if they're the same, it'll result in 0
            if (user.verificationCode - verificationCode !== 0) return res.status(404).json({ "message": "Incorrect verification code" })

            return User.findByIdAndUpdate(
                id,
                { $set: { isVerified: true } },
                { new: true }
            )
        })
        .then(() => {

            pusher.trigger("experience", "profile", {
                trigger: true
            })

            return res.status(200).json({ "message": "Email verified successfully" })

        })
        .catch(error => {
            console.log(error)
            return res.status(404).json({ "message": "Email verification Failed", error })
        })
}








//SEND NEW VERIFICATION CODE TO THE USER'S EMAIL FOR VERIFICATION PROCESS

export const sendVerificationCode = (req, res) => {
    const { id } = req.user


    //randomly creating 6 digits to become the verification code

    const verificationCode = (Math.floor(100000 + Math.random() * 900000))
    

    //adding the new verification code to users data 
    User.findByIdAndUpdate(
        id,
        {
            $set: {
                verificationCode: verificationCode,
                isVerified: false

            }
        },

        { new: true }
    )
        .then(() => {
            
            //sedning email to user with same verification code for verifying account
            sendEmail(user.email, verificationCode)
            
            return res.status(200).json({ "message": "Verification code sent" })
        })
        .catch(error => {
            return res.status(404).json({ "message": "Failed to send code", error })
        })

}






//UPDATING LOGGED IN USER'S ACCOUNT DETAILS/PROFILE

export const updateUser = (req, res) => {
    const { id } = req.user
    const { firstName, lastName } = req.body
    const data = req.body


    if (!firstName) {
        return res.status(400).json({ "message": "Please enter your first name" })
    }

    if (!lastName) {
        return res.status(400).json({ "message": "Please enter your last name" })
    }

    User.findById(id)
        .then(user => {
            if (!user) return res.status(404).json({ "message": `User with ${id} does not exist ` })

            return User.findByIdAndUpdate(
                id,
                { ...data },
                { new: true })
        })
        .then((user) => {

            res.status(200).json({ "message": "Profile updated", user })

            pusher.trigger("experience", "profile", {
                trigger: true
            })

        })
        .catch(error => {

            return res.status(404).json({ "message": "Failed to update profile", "error": error })
        })
}







//AUTHENTICATE USER / SIGNING IN USER INTO CLIENT SIDE

export const authenticateUser = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ "message": "Please enter all fields" })
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ "message": "User doesn't exists or Incorrect Credentials" })

            // comparing password in database with password from client with bcrypt.

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ "message": "Incorrect Credentials" })

                    jwt.sign(
                        { id: user.id },
                        JWT_SECRET,

                        (err, token) => {
                            console.log(err)
                            if (err) throw err

                            res.status(200).json({
                                token,
                                user,
                            })
                        }
                    )
                })

        })
        .catch(error => {
            console.log(error)
            return res.status(409).json({ "message": "Signing in failed", "error": error })
        })
}







//FETCHES SINGLE USER FROM THE DATABASE AND RETURNS DATA TO THE CLIENT

export const getSingleUser = (req, res) => {
    const { id } = req.params

    User.findById(id)
        .then(user => {

            return res.status(200).json(user)
        })
        .catch(error => {
            return res.status(409).json({ error })
        })

}





//USED TO CONSTANTLY RETURN LOGGED IN USER TO THE CLIENT, SO USER CAN REMAIN LOGGED IN ON NAVIGATING APP

export const getLoggedInUser = (req, res) => {
    const { id } = req.user

    User.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            return res.status(409).json({ error })
        })
}








//DELETES USER ACCOUNT FROM THE PROFILE

export const deleteUser = (req, res) => {
    const { id } = req.user


    Experience.find()
        .where('createdBy').equals(id)
        .then(experiences => {

            //DELETES ALL EXPERIENCES CREATED BY USER ACCOUNT
            experiences.length > 0 && experiences.map(experience => {
                return experience.remove()
            })

            return User.findById(id)
                .then(user => {

                    return user.remove()
                        .then(() => {

                            pusher.trigger("experience", "profile", {
                                trigger: true
                            })

                            pusher.trigger("experience", "experience", {
                                trigger: true
                            })

                            return res.status(200).json({ "message": "Account deleted", user })
                        })

                })

        })
        .catch(error => {
            return res.status(409).json({ "message": "Failed to delete account", error })
        })

}