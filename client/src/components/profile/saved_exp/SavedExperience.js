import React from 'react'
import { Link } from 'react-router-dom'






const NoExperienceComponent = () => {
    return (
        <div className="no-experience-component-container">
            <p>When you save an experience, it will appear here..</p>
        </div>
    )
}




const SavedExperience = ({ savedExperience }) => {

    if (savedExperience && !savedExperience.length > 0) return <NoExperienceComponent />
    return (
        <div className="saved-experience-container">
            {
                savedExperience.map(experience => {
                    return (
                        <Link 
                            to={`/experience/${experience._id}`}
                            key={experience._id} 
                            className="each-saved-experience-image-container"
                        >
                            <img src={experience.imageUrl} alt={experience.title} />
                        </Link>
                    )
                })
            }

        </div>
    )
}



export default SavedExperience