import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import TurnedInIcon from '@material-ui/icons/TurnedIn'
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot'
import { green } from '@material-ui/core/colors'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteIcon from '@material-ui/icons/Delete'
import ShareIcon from '@material-ui/icons/Share'
import OptionsDialog from './options_dialog/OptionsDialog'
import axios from 'axios'



import { likeExperience, unLikeExperience, saveExperience, unSaveExperience, deleteExperience } from '../../store/actions/experiences'
import { UnLikedIcon, LikedIcon } from '../my_icons/MyIcons'
import { Avatar } from '@material-ui/core'
import ExpCardSkeleton from '../skeletons/experience_card/ExpCardSkeleton'
import ShareDialog from './share_dialog/ShareDialog'



import { usersUrl } from '../../api'





const ExperienceCard = ({ experience }) => {
    const [optionsDialog, setOptionsDialog] = useState(false) //state of opening and closing options dialog
    const [shareDialog, setShareDialog] = useState(false)//state for opening dialog to share experience
    const [createdBy, setCreatedBy] = useState(null) //state to save the the account that created the experience
    const [loading, setLoading] = useState(true) //loading state whilst fetching experience creator data


    const dispatch = useDispatch()

    //logged in user account gotten from redux state
    const user = useSelector((state) => state.auth.user)

    //fetching creator of the experience profile data
    const handleFetchCreatorDetails = useCallback(() => {
        const { createdBy } = experience //user id of the experince creator

        axios.get(`${usersUrl}/${createdBy}`)
            .then(res => {
                setCreatedBy(res.data)
                setLoading(false)
            })
            .catch(error => {
                
                setLoading(false)
            })
    }, [experience])


    useEffect(() => {
        handleFetchCreatorDetails()

    }, [handleFetchCreatorDetails])




    const openOptionsDialog = () => {
        setOptionsDialog(true)
    }


    const closeOptionsDialog = () => {
        setOptionsDialog(false)
    }

    const openShareDialog = () => {
        setShareDialog(true)
    }


    const closeShareDialog = () => {
        setShareDialog(false)
    }

   
    //reduces the experience summary to a total 30 character
    const reducedSummary = `${experience?.summary.substr(0, 30)} ......................`




    if (loading) return <ExpCardSkeleton />
    return (
        <div className="experience-card-container">
            <OptionsDialog
                open={optionsDialog}
                handleClose={closeOptionsDialog}
                openShare={openShareDialog}
                user={user}
                experience={experience}
            />

            <ShareDialog
                open={shareDialog}
                handleClose={closeShareDialog}
                experienceId={experience._id}
            />

            <div className="experience-card-top-section-container">

                <div className="experience-card-info-container">
                    <Avatar src={createdBy?.profileImage} />

                    <div className="experience-name-time-detail">
                        <Link
                            to={`/user/${createdBy?._id}`}
                        >
                            <p>{createdBy?.firstName} {createdBy?.lastName}</p>
                        </Link>
                        <small>{moment(experience?.createdAt).fromNow()}</small>
                    </div>

                </div>

                <MoreVertIcon onClick={openOptionsDialog} style={{ color: green[500] }} />
            </div>

            <Link
                to={`/experience/${experience?._id}`}
                className="experience-card-image-container"
            >
                <img src={experience.imageUrl} alt="File" />
            </Link>

            <div className="experience-card-details-container">

                <h3>{experience?.title}</h3>

                <p>{reducedSummary}</p>

                <div className="experience-card-details-actions-container">

                    <div className="likes-container">

                        {
                            experience && experience.likes.includes(user?._id) ?
                                <LikedIcon
                                    action={() => dispatch(unLikeExperience(experience?._id))}
                                    width='24px'
                                    height='24px'
                                />

                                :

                                <UnLikedIcon
                                    action={() => dispatch(likeExperience(experience?._id))}
                                    width='24px'
                                    height='24px'
                                />
                        }
                        <p>{experience.likes.length}</p>
                    </div>

                    <div className="share-delete-save-container">
                        
                        <ShareIcon 
                            onClick={openShareDialog}
                        />

                        {user?._id === experience?.createdBy ?
                            <DeleteIcon onClick={() => dispatch(deleteExperience(experience?._id))} /> :
                            user && user?.savedExperience.includes(experience?._id) ?
                                <TurnedInIcon
                                    onClick={() => dispatch(unSaveExperience(experience._id))}
                                />
                                :
                                <TurnedInNotIcon
                                    onClick={() => dispatch(saveExperience(experience?._id))}
                                />
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}


export default ExperienceCard