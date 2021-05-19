import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import CommentSkeleton from '../../../../components/skeletons/comment/CommentSkeleton'
import { Avatar } from '@material-ui/core'
//import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete'




import { LikedIcon, UnLikedIcon } from '../../../../components/my_icons/MyIcons'
import { likeComment, unLikeComment, deleteComment } from '../../../../store/actions/experiences'





const EachComment = ({ comment, expId, experience }) => {
    const [commentBy, setCommentBy] = useState(null)
    const [fetching, setFetching] = useState(true)

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)


    const getCommentByData = useCallback(() => {
        const { commentById } = comment
        //setFetching(true)
        axios.get(`http://localhost:5000/users/${commentById}`)
            .then(res => {
                setCommentBy(res.data)
                setFetching(false)
            })
            .catch(error => {
                setFetching(false)
                console.log(error)
            })

    }, [comment])


    useEffect(() => {
        getCommentByData()

    }, [getCommentByData])

    const data = {
        expId : expId,
        commentId : comment._id
    }



    if (fetching) return <CommentSkeleton />
    return (
        <div className="each-comment-list-container">

            <div className="each-comment-poster-details-container">
                <Avatar src={commentBy?.profileImage} />
                <div className="text-details-container">
                    <p>Comment by {commentBy?.firstName} {commentBy?.lastName} {moment(comment?.commentTime).fromNow()}</p>
                </div>
            </div>

            <div className="each-comment-body-container">
                <p>{comment?.commentText}</p>
            </div>

            <div className="each-comment-action-container">
                {comment?.likes.includes(user?._id) ?
                    < LikedIcon
                        width="24px"
                        height="24px"
                        action={ () => dispatch(unLikeComment(data))}
                    />

                    :
                    <UnLikedIcon
                        width="24px"
                        height="24px"
                        action={ () => dispatch(likeComment(data))}
                    />
                }

                { comment?.commentById === user?._id || experience.createdBy === user?._id ?
                    <DeleteIcon 
                        onClick = { () => dispatch(deleteComment(data))}
                    />
                    : null
                }


            </div>

        </div>
    )
}



export default EachComment