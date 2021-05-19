import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
//import { v4 as uuidv4 } from 'uuid'



import { LikedIcon, UnLikedIcon } from '../../../components/my_icons/MyIcons'
import { commentOnExperience } from '../../../store/actions/experiences'
import { likeExperience, unLikeExperience } from '../../../store/actions/experiences'
import EachComment from './each_comment/EachComment'






const ExperienceComments = ({ experienceId, comments, experience }) => {
    const [commentText, setCommentText] = useState("")


    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    const handleOnChange = (e) => {
        setCommentText(e.target.value)
    }

    const clearCommentText = () => {
        setCommentText("")
    }


    const handleSubmitComment = (e) => {
        e.preventDefault()
        const commentData = {
            commentById: user._id,
            commentText: commentText,
            likes: [],
            commentTime: new Date()
        }

        //console.log(experienceId)
        dispatch(commentOnExperience(experienceId, commentData, clearCommentText))
    }

    return (
        <div className="experience-comments-container">

            <div className="experience-comments-details-container">
                <p>{comments && comments.length} comment{comments?.length === 0 && "s"} </p>

                <div className="likes-container">
                    {
                        experience && experience.likes.includes(user?._id) ?
                            <LikedIcon
                                action={() => dispatch(unLikeExperience(experience._id))}
                                width='24px'
                                height='24px'
                            />

                            :

                            <UnLikedIcon
                                action={() => dispatch(likeExperience("experience._id"))}
                                width='24px'
                                height='24px'
                            />
                    }
                    <p>{experience?.likes.length}</p>
                </div>
            </div>

            <form className="experience-comments-input-container">
                <TextField type="text" name="comment" label="Comment on experience"
                    id="outlined-multiline-static"
                    multiline
                    variant="outlined"
                    style={{ width: "100%" }}
                    rowsMax={5}
                    onChange={handleOnChange}
                />

                <Button
                    type='submit'
                    variant="outlined"
                    onClick={handleSubmitComment}
                    disabled={commentText === ""}
                >
                    Post Comment
                </Button>

            </form>

            <div className="experience-comments-list-container">
                {
                    comments && comments.length > 0 ?
                        comments.map(comment => {
                            return (
                                <EachComment
                                    comment={comment}
                                    expId={experienceId}
                                    key={comment._id}
                                    experience={experience}
                                />
                            )
                        })
                        :

                        <div className="no-comment-container">
                            <p>Be the first to comment ....</p>
                        </div>
                }

            </div>

        </div>
    )
}





export default ExperienceComments