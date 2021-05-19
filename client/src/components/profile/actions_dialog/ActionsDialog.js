import React from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import { Button } from '@material-ui/core'




import { logoutUser, deleteAccount } from '../../../store/actions/auth'







const ProfileActionsDialog = ({ open, handleClose, history }) => {


    const dispatch = useDispatch()

    const handleLogoutUser = () => {
        dispatch(logoutUser(history))
        handleClose()
    }

    const handleDeleteAccount = () => {
        dispatch(deleteAccount(history))
        handleClose()
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <div className="profile-actions-dialog-container">

                <div className="profile-actions-dialog-button-container">
                    <Button
                        onClick={handleLogoutUser}
                    >
                        Log Out
                    </Button>
                </div>

                <div className="profile-actions-dialog-button-container" >
                    <Button
                        onClick={handleDeleteAccount}
                        color="secondary"
                    >
                        Delete Account 
                    </Button>
                </div>

            </div>
        </Dialog>
    )
}



export default withRouter(ProfileActionsDialog)