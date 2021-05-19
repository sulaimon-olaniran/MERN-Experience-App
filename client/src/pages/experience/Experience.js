import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pusher from 'pusher-js'
import axios from 'axios'
import moment from 'moment'
import ExperienceComments from './comments/ExperienceComments'
import ShareExperience from './share/ShareExperience'
import { Avatar } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import TurnedInIcon from '@material-ui/icons/TurnedIn'
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot'



import { deleteExperience, saveExperience, unSaveExperience } from '../../store/actions/experiences'
import SpinnerLoader from '../../components/loaders/spinner_loader/SpinnerLoader'
import { experiencesUrl, usersUrl } from '../../api'



const ExperiencePage = ({ match }) => {
    const [experienceData, setExperienceData] = useState(null)
    const [creatorData, setCreatorData] = useState(null)
    const [fetching, setFetching] = useState(false)


    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)


    const getExperienceData = useCallback((reload) => {
        !reload && setFetching(true)
        const expId = match.params.id

        axios.get(`${experiencesUrl}/${expId}`)
            .then(res => {
                setExperienceData(res.data)
                return axios.get(`${usersUrl}/${res.data.createdBy}`)
                    .then(response => {
                        setCreatorData(response.data)
                        setFetching(false)
                    })
            })
            .catch(error => {
                console.log(error)
                setFetching(false)
            })
    }, [match])


    useEffect(() => {
        getExperienceData()

        const pusher = new Pusher('249f2df25e3d65b17fd7', {
            cluster: 'mt1'
        });

        const channel = pusher.subscribe('experience');

        channel.bind('experience-created', function (data) {
            getExperienceData("reload")
        });


        return () => {
            channel.unbind('experience-created')
        }


    }, [dispatch, getExperienceData])


    if (fetching) return <SpinnerLoader />
    return (
        <div className="experience-page-container">

            <div className="main-experience-contents-container">
                <div className='experience-creator-details-container'>
                    <div className="sub-creator-details-container">
                        <Avatar src={creatorData?.profileImage} />
                        <div className="texts-container">
                            <p>{creatorData?.firstName} {creatorData?.lastName}</p>
                            <p>{moment(experienceData?.createdAt).fromNow()}</p>
                        </div>
                    </div>

                    {
                        user?._id === experienceData?.createdBy ?
                            <DeleteIcon onClick={() => dispatch(deleteExperience(experienceData?._id))} />
                            :
                            user?.savedExperience.includes(experienceData?._id) ?
                                <TurnedInIcon
                                    onClick={() => dispatch(unSaveExperience(experienceData?._id))}
                                />
                                :
                                <TurnedInNotIcon
                                    onClick={() => dispatch(saveExperience(experienceData?._id))}
                                />
                    }

                </div>


                <div className="experience-page-image-container">
                    <img src={experienceData?.imageUrl} alt="Experience" />
                </div>


                <div className="experience-page-title-container">
                    <h1>{experienceData?.title}</h1>
                    <p>( {experienceData?.category} )</p>
                </div>


                <div className="experience-page-summary-container">
                    <p>{experienceData?.summary}</p>
                </div>


                <ShareExperience experienceId={experienceData?._id} />
            </div>

            
            <ExperienceComments
                experienceId={experienceData?._id}
                comments={experienceData?.comments}
                experience={experienceData}
            />

        </div>
    )
}



export default ExperiencePage