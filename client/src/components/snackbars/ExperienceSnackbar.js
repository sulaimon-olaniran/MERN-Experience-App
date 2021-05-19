import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
//import { makeStyles } from '@material-ui/core/styles'




import { closeSnackbar } from '../../store/actions/experiences'



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}








const ExperienceSnackbar = () => {
    const dispatch = useDispatch()

    const open = useSelector((state) => state.experiences.openSnackbar)
    const severity = useSelector((state) => state.experiences.snackbarSeverity)
    const snackbarText = useSelector((state) => state.experiences.snackbarText)

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



export default ExperienceSnackbar