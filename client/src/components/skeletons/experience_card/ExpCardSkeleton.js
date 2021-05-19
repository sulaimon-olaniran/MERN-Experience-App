import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const ExpCardSkeleton = () => {
  return (
    <div className="exp-card-skeleton-container">

      <div className="exp-top-section-container">

        <Skeleton variant="circle" width={80} height={80} />

        <div className="exp-top-texts-container">
          <Skeleton variant="text" width="90%" height={40} />
          <Skeleton variant="text" width="90%" height={40} />
        </div>

      </div>
      <Skeleton variant="rect" width="90%" height="20rem" />

      <Skeleton variant="text" width="90%" height={40} />
      <Skeleton variant="text" width="90%" height={40} />


    </div>
  );
}



export default ExpCardSkeleton