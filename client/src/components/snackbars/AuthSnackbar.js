import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
//import { makeStyles } from '@material-ui/core/styles'




import { closeSnackbar } from '../../store/actions/auth'



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}








const AuthSnackbar = () => {
    const dispatch = useDispatch()

    const open = useSelector((state) => state.auth.authSnackbar)
    const severity = useSelector((state) => state.auth.authSnackbarSeverity)
    const snackbarText = useSelector((state) => state.auth.authSnackbarText)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeSnackbar());
    };

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {snackbarText}
            </Alert>
        </Snackbar>

    )
}



export default AuthSnackbar