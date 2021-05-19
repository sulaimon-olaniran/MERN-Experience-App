import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { FadeLoader } from "react-spinners"






const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))




//LOADER TO DISPLAY WHEN A USER INNITIATS AN ACTION AND IS AWAITING RESPONSE FROM THE BACKEND

const ActionLoader = () => {
    const styles = useStyles()
    const experienceActionsLoader = useSelector((state) => state.experiences.actionsLoader)
    const authActionsLoader = useSelector((state) => state.auth.actionLoader)
    

    return (
        <Backdrop 
            className={styles.backdrop} 
            open={experienceActionsLoader || authActionsLoader  }
        >
            <FadeLoader color="white" />
        </Backdrop>
    )
}



export default ActionLoader