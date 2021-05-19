import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/Edit'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import LinkIcon from '@material-ui/icons/Link'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import { Button } from '@material-ui/core'
import { green } from '@material-ui/core/colors'





import ProfileActionsDialog from './actions_dialog/ActionsDialog'
import SharedExperience from './shared_exp/SharedExperience'
import SavedExperience from './saved_exp/SavedExperience'





const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));






const ProfileComponent = ({ user, from }) => {
    const [actionsDialog, setActionsDialog] = useState(false)
    const [showSharedExp, setShowSharedExp] = useState(true)



    const styles = useStyles()

    const experiences = useSelector((state) => state.experiences.experiences)


    const handleShowSharedExp = () => {
        setShowSharedExp(true)
    }

    const handleShowSavedExp = () => {
        setShowSharedExp(false)
    }

    const handleOpenActionsDialog = () => {
        setActionsDialog(true)
    }


    const handleCloseActionsDialog = () => {
        setActionsDialog(false)
    }


    //filter function to return only experiences shared by the logged in user
    const filterOutSharedExperience = (data) => {
        return (
            user?._id === data.createdBy
        )
    }


    //filter function to return only experiences saved by the logged in user
    const filterOutSavedExperience = (data) => {
        return (
            user?.savedExperience.includes(data._id)
        )
    }



    return (
        <div className="profile-component-container">
            <ProfileActionsDialog
                open={actionsDialog}
                handleClose={handleCloseActionsDialog}

            />

            <div className="profile-component-details-container">

                <div className='first-section'>
                    <div className="actions-image-container">
                        {from === "profile" &&
                            <Link to="/profile/edit">
                                <EditIcon />
                            </Link>}

                        <Avatar
                            className={styles.large}
                            src={user?.profileImage}
                        />

                        {from === "profile" &&
                            <MoreHorizIcon
                                onClick={handleOpenActionsDialog}
                            />}
                    </div>
                    <h1><span>{user?.firstName}</span> {user?.lastName}</h1>
                </div>



                <div className="second-section">
                    <p>{user?.about}</p>
                </div>

                {
                    !user?.isVerified &&
                    <Link to='/user/email/verification'>
                        <Button
                            color='secondary'
                            variant='contained'
                        >
                            Please verify your Email
                    </Button>
                    </Link>
                }

                {(user?.instagram || user?.facebook || user?.website || user?.twitter) &&
                    <div className="third-section">

                        {user?.website &&
                            <LinkIcon
                                fontSize="large"
                            />
                        }



                        {user?.twitter &&
                            <TwitterIcon
                                fontSize="large"
                                style={{ color: "#00acee" }}
                            />
                        }



                        {user?.instagram &&
                            <InstagramIcon
                                fontSize="large"
                                style={{ color: "#C13584" }}
                            />
                        }



                        {user?.facebook &&
                            <FacebookIcon
                                fontSize="large"
                                style={{ color: "#3b5998" }}
                            />
                        }


                    </div>
                }
            </div>


            <div className="profile-component-experiences-container">

                {from === "profile" && //ONLY SHOW SAVED EXPERIENCE IF IT'S LOGGED IN USER CHEKCING HIS/HER PROFILE
                    <div className="profile-component-experiences-button-container">
                        <Button
                            onClick={handleShowSharedExp}
                            variant={showSharedExp ? "contained" : "outlined"}
                            style={showSharedExp ?
                                { backgroundColor: green[500], color: "white" }
                                :
                                { color: green[500] }}
                        >
                            Shared
                        </Button>

                        <Button
                            onClick={handleShowSavedExp}
                            variant={!showSharedExp ? "contained" : "outlined"}
                            style={!showSharedExp ?
                                { backgroundColor: green[500], color: "white" }
                                :
                                { color: green[500] }}
                        >
                            Saved
                        </Button>
                    </div>
                }

                {showSharedExp ?
                    <SharedExperience
                        sharedExperience={experiences?.filter(filterOutSharedExperience)}
                    />
                    :
                    <SavedExperience
                        savedExperience={experiences?.filter(filterOutSavedExperience)}
                    />
                }


            </div>


        </div>
    )
}


export default ProfileComponent