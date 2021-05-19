import Experience from '../models/experience.js'
import User from '../models/user.js'
import Pusher from 'pusher'
import dotnev from 'dotenv'
import mongoose from 'mongoose'




dotnev.config()



const { PUSHER_SECRET } = process.env



//Using pusher to trigger real time updates from server to client
const pusher = new Pusher({
    appId: "1191988",
    key: "249f2df25e3d65b17fd7",
    secret: PUSHER_SECRET,
    cluster: "mt1",
    useTLS: true,
});





//GETS ALL EXPERIENCES FROM THE DATABASE AND RETURNS IT TO THE CLIENT

export const getExperiences = (req, res) => {
    //getting all experiences and returning them from newest to oldest based on time created.
    
    Experience.find().sort({ createdAt: -1 })
        .then(experiences => {
            //console.log(experiences[0]._id)
            return res.status(200).json(experiences)
        })
        .catch(error => {
            return res.status(409).json({ "error": error })
        })
}






//GETS A SINGLE EXPERIENCE FROM THE DATABASE AND RETURNS IT TO THE CLIENT

export const getSingleExperience = (req, res) => {
    const id = req.params.id

    Experience.findById(id)
        .then(experience => {
            return res.status(200).json(experience)
        })
        .catch(error => {
            return res.status(409).json({ "error": error })
        })
}





//RECEIVE NEW EXPERIENCE FROM THE CLIENT AND ADDS IT TO THE DATABASE

export const createExperience = async (req, res) => {
    const { title, category, imageUrl, createdBy, summary } = req.body
    const experience = req.body

    //making sure all fields are filled out from front end, although I used formik and yup in the front end..not bad adding validation here as well
    if (!title || !category || !imageUrl || !createdBy || !summary) {
        return res.status(400).json({ "message": "Please enter all fields" })
    }

    //checking if the user ID is valid in mongodb or if there's user with that id
    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
        return res.status(404).json({ "message": "No user with such ID" })
    }

    const newExperience = new Experience(experience)

    //if all checks are complete, expereince can be successfully saved to db

    newExperience.save()
        .then((exp) => {
            //triggering a new experience being added so as client side can be refreshed
            pusher.trigger("experience", "experience", {
                trigger: true
            })

            return res.status(201).json({ "message": "Experience Shared Successful", "experience": exp })
        })
        .catch(error => res.status(409).json({ "message": "Failed to share Experience", "error": error }))


}




//SAVES EXPERIENCE TO THE LOGGED IN USER'S DATABASE

export const saveExperience = (req, res) => {
    const experienceId = req.params.id
    // user { id } gotten from the auth middleware and was decoded from the jsonwebtoken sent from the frontend/client
    const { id } = req.user

    //validating the user id to confirm if user with such id exists
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ "message": "No user with such ID" })

    //validating the experience id to confirm if experience with such id exists
    if (!mongoose.Types.ObjectId.isValid(experienceId)) return res.status(404).json({ "message": "No Experience with such ID" })


    User.findByIdAndUpdate(id, { $push: { savedExperience: experienceId } }, { new: true })
        .then(() => {
            pusher.trigger("experience", "profile", {
                "trigger": true
            })
            return res.status(200).json({ "message": "Experience saved successfully" })
        })
        .catch(error => {
            return res.status(409).json({ "message": "Saving Experience failed", "error": error })
        })
}






//REMOVES EXPERIENCE ID FROM LOGGED IN USER DATA

export const unSaveExperience = (req, res) => {
    const experienceId = req.params.id
    const { id } = req.user

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ "message": "No user with such ID" })

    if (!mongoose.Types.ObjectId.isValid(experienceId)) return res.status(404).jspm({ "message": "No Experience with such ID" })

    User.findByIdAndUpdate(id, { $pull: { savedExperience: experienceId } }, { new: true })
        .then(() => {
            pusher.trigger("experience", "profile", {
                "trigger": true
            })
            return res.status(200).json({ "message": "Experience Unsaved Successfully" })
        })
        .catch(error => {
            return res.status(409).json({ "message": "Unsaving experience failed", "error": error })
        })
}




//DELETES AN EXPERIECE FROM THE DATABASE

export const deleteExperience = (req, res) => {
    const id = req.params.id

    Experience.findById(id)
        .then(experience => {
            if (!experience) return res.status(404).json({ "message": "No Experience with such ID" })

            return experience.remove()

        })
        .then(() => {
            pusher.trigger("experience", "experience", {
                "trigger": true
            })

            return res.status(200).json({ "message": "Experience Deleted" })
        })
        .catch(error => res.status(409).json({ "message": "Experience deleting failed", "error": error }))
}








 
export const likeExperience = (req, res) => {
    const { id } = req.user
    const experienceId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ "message": "No user with such ID" })

    if (!mongoose.Types.ObjectId.isValid(experienceId)) return res.status(404).json({ "message": "No Experience with such ID" })

     
    Experience.findByIdAndUpdate(experienceId, { $push: { likes: id } }, { new: true })
        .then(() => {
            pusher.trigger("experience", "experience", {
                "trigger": true
            })

            return res.status(200).json({ "message": "Liked Experience Successfully" })
        })
        .catch(error => {
            return res.status(409).json({ "message": "Liking Experience failed" })
        })


}









export const unLikeExperience = (req, res) => {
    const { id } = req.user
    const experienceId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ "message": "No user with such ID" })

    if (!mongoose.Types.ObjectId.isValid(experienceId)) return res.status(404).json({ "message": "No Experience with such ID" })


    Experience.findByIdAndUpdate(experienceId, { $pull: { likes: id } }, { new: true })
        .then(() => {
            pusher.trigger("experience", "experience", {
                "trigger": true
            })

            return res.status(200).json({ "message": "Unliked Experience Successfully" })
        })
        .catch(error => {
            return res.status(409).json({ "message": "Unliking Experience failed", "error": error })
        })

}








export const commentOnExperience = (req, res) => {
    const experienceId = req.params.id
    const { commentById, commentText } = req.boy
    const comment = req.body


    if (!commentById || !commentText) return res.status(400).json({ "message": "Invalid, please enter all fields" })


    if (!mongoose.Types.ObjectId.isValid(commentById)) return res.status(404).json({ "message": "No user with such ID" })


    if (!mongoose.Types.ObjectId.isValid(experienceId)) return res.status(404).json({ "message": "No Experience with such ID" })



    Experience.findByIdAndUpdate(experienceId, { $push: { comments: comment } }, { new: true })
        .then(() => {
            pusher.trigger("experience", "experience", {
                "newComment": true
            })

            return res.status(200).json({ "message": "Commented on Expereience" })
        })
        .catch(error => {

            return res.status(409).json({ message: "Commenting Failed", "error": error })
        })
}










export const likeComment = (req, res) => {
    const { id } = req.user
    const experienceId = req.params.id
    const { commentId } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ "message": "No user with such ID" })

    if (!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).json({ "message": "No Comment with such ID" })

    if (!mongoose.Types.ObjectId.isValid(experienceId)) return res.status(404).json({ "message": "No Experience with such ID" })


    Experience.findOneAndUpdate({ _id: experienceId, "comments._id": commentId },
        {
            $push: { "comments.$.likes": id }

        },
        { new: true })

        .then((data) => {
            pusher.trigger("experience", "experience", {
                "likedComment": true
            })


            return res.status(200).json({ "message": "Successfully liked comment" })
        })
        .catch(error => {
            //console.log(error)
            return res.status(409).json({ message: "Failed to like comment", "error": error })
        })
}









export const unLikeComment = (req, res) => {
    const { id } = req.user
    const experienceId = req.params.id
    const { commentId } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ "message": "No user with such ID" })

    if (!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).json({ "message": "No Comment with such ID" })

    if (!mongoose.Types.ObjectId.isValid(experienceId)) return res.status(404).json({ "message": "No Experience with such ID" })



    Experience.findOneAndUpdate({ _id: experienceId, "comments._id": commentId },
        {
            $pull: { "comments.$.likes": id }

        },
        { new: true }
    )
        .then((data) => {
            pusher.trigger("experience", "experience", {
                "unLikedComment": true
            })
            //console.log(data)

            return res.status(200).json({ "message": "Unliked comment Successfully" })
        })
        .catch(error => {
            //console.log(error)
            return res.status(409).json({ "message": "Unliking comment Failed", "error": error })
        })
}












export const deleteComment = (req, res) => {
    const experienceId = req.params.id
    const { commentId } = req.body

    if (!mongoose.Types.ObjectId.isValid(experienceId)) return res.status(404).json({ "message": "No Experience with such ID" })

    if (!mongoose.Types.ObjectId.isValid(commentId)) return res.status(404).json({ "message": "No Comment with such ID" })


    Experience.findByIdAndUpdate(experienceId, { $pull: { comments: { _id: commentId } } }, { new: true })
        .then((data) => {
            pusher.trigger("experience", "experience", {
                "deleteComment": true
            })

            return res.status(200).json({ "message": "Deleted comment Successfully" })
        })
        .catch(error => {

            return res.status(409).json({ "message": "Deleting comment Failed", "error": error })
        })
}