import mongoose from 'mongoose'



const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    website : String,
    facebook : String,
    instagram : String,
    twitter : String,
    isVerified : {
        type : Boolean,
        default : false
    },

    verificationCode : {
        type : Number,
        default : null,
        expires: 600,
        select : false
    },

    email : {
        type : String,
        unique : true,
    },

    password : {
        type: String,
        unique : true,
        //select : false
    },

    about : {
        type : String,
        default : "I'm here to share some Experience"
    },
    savedExperience : [String],
    profileImage : String,
    registerDate : {
        type : Date,
        default: new Date()
    }
})



const User = mongoose.model('User', userSchema)


export default User