import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'



const CommentSkeleton = () => {
    return (
        <div className="comment-skeleton-container">

            <div className="comment-top-section-container">

                <Skeleton variant="circle" width={40} height={40} />


                <div className="comment-texts-container">
                    <Skeleton variant="text" width="90%" height={40} />
                </div>

            </div>

            <Skeleton variant="rect" width="90%" height="6rem" />


        </div>
    );
}



export default CommentSkeleton