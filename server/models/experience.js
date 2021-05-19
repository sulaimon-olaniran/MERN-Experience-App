import mongoose from 'mongoose'



const experienceSchema = mongoose.Schema({
    createdBy : String,
    title : String,
    summary : String,
    likes : [String],
    category : String,
    comments: [{
        commentById : String,
        likes : [String],
        commentBy : String,
        commentText : String,
        commentTime : {
            type : Date,
            default: new Date()
        }
    }],
    imageUrl : String,
    tags : [String],
    createdAt : {
        type : Date,
        default: new Date()
    }
})



const Experience = mongoose.model('Experience', experienceSchema)


export default Experience