import React from 'react'
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { green } from '@material-ui/core/colors'




const NoExperienceComponent = () => {
    return (
        <div className="no-experience-component-container">
            <p>You currently haven't shared any experience, click the Green Icon below to share an experience.</p>
            <Link to='/create/experience'>
                <AddCircleOutlineIcon style={{ color: green[500] }} fontSize="large" />
            </Link>
        </div>
    )
}


const SharedExperience = ({ sharedExperience }) => {

    if (sharedExperience && !sharedExperience.length > 0) return <NoExperienceComponent />
    return (
        <div className="shared-experience-container">
            {
                sharedExperience.map(experience => {
                    return (
                        <Link
                            to={`/experience/${experience._id}`}
                            key={experience._id}
                            className="each-shared-experience-image-container"
                        >
                            <img src={experience.imageUrl} alt={experience.title} />
                        </Link>
                    )
                })
            }

        </div>
    )
}



export default SharedExperience