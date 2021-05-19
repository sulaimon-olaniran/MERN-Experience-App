import axios from 'axios'



import { usersUrl } from '../../api'


import {
    FETCHED_ACCOUNT,
    SIGNING_UP,
    SIGNED_UP,
    LOGGED_OUT,
    SIGNING_IN,
    SIGN_UP_ERROR,
    SIGNED_IN,
    SIGN_IN_ERROR,
    FETCHING_ACCOUNT,
    FETCHED_ACCOUNT_FAILED,
    UPDATING_ACCOUNT,
    UPDATED_ACCOUNT,
    UPDATE_ACCOUNT_FAIL,
    DELETING_ACCOUNT,
    DELETED_ACCOUNT,
    DELETE_ACCOUNT_FAILED,
    VERIFIED_EMAIL_FAILED,
    VERIFIED_EMAIL,
    VERIFYING_EMAIL,
    SENDING_VERIFICATION_CODE,
    SEND_VERIFICATION_CODE,
    SEND_VERIFICATION_CODE_FAILED,
    CLOSE_SNACKBAR

} from '../../constants/actionTypes'




const baseUrl = usersUrl



//SIGN UP USER INTO THE APPLICATION BY ADDING USER TO THE DATABASE AND SAVING SIGNED UP USER TO REDUX STORE

export const signUpUser = ({ firstName, lastName, email, password, confirmPassword }, history) => {
    return (dispatch, getState) => {
        
        dispatch({ type: SIGNING_UP })

        const newUser = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }


        axios.post(baseUrl, newUser )
            .then(res => {
                dispatch({
                    type: SIGNED_UP,
                    payload: res.data
                })

                history.push('/user/email/verification')
            })
            .catch(error => {

                dispatch({
                    type: SIGN_UP_ERROR,
                    payload: error.response.data.message
                })
            })
    }

}




//SIGN IN USER TO THE APPLICATION AND SAVING USER DATA TO REDUX STORE

export const signInUser = ({ email, password }, history) => {
    return (dispatch, getState) => {
        dispatch({ type: SIGNING_IN })

        const reqBody = { email, password }

        axios.post(`${baseUrl}/auth`, reqBody)
        .then(res => {
            const user = res.data.user
        
            dispatch({
                type : SIGNED_IN,
                payload : res.data
            })

            if(user.isVerified){
                history.push('/')
            }
            else{
                history.push('/user/email/verification')
            }
        })
        .catch(error => {

            dispatch({
                type: SIGN_IN_ERROR,
                payload: error.response.data.message
            })
        })

    }

}




//TO CONSTANTLY GET LOGGED IN ACCOUNT TO HAVE USER LOGGED IN,, WOULD BE CALLED IN THE ROOT OF THE APP (APP.JS) SO AS TO FIRE EVERYTIME

export const getAccount = () => {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_ACCOUNT })


        const token = getState().auth.token

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }


        if (token) {
            config.headers["x-auth-token"] = token
        }


        axios.get(`${baseUrl}/auth/user`, config)
            .then(res => {
                dispatch({
                    type: FETCHED_ACCOUNT,
                    payload: res.data
                })
            })
            .catch(error => {
                
                dispatch({
                    type : FETCHED_ACCOUNT_FAILED
                })
            })
    }

}





//UPDATES USER DATA IN THE DATABASE
export const updateAccount = (data) => {
    return (dispatch, getState) => {
        dispatch({ type : UPDATING_ACCOUNT })

        const { firstName, lastName, website, instagram, twitter, facebook, profileImage, about } = data

        const updatedUser = {
            firstName, lastName, website, instagram, twitter, facebook, profileImage, about
        }

        const token = getState().auth.token
        
        
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }


        if (token) {
            config.headers["x-auth-token"] = token
        }

        axios.patch(`${baseUrl}/update/user`, updatedUser, config)
        .then(res => {
            console.log(res.data)
            dispatch({ 
                type : UPDATED_ACCOUNT,
                payload : res.data.user
            })
        })
        .catch(error => {
            dispatch({
                type : UPDATE_ACCOUNT_FAIL,
                payload : error.response.data.message
            })
        })


    }
}




//TO SEND DATA TO THE BACKEND TO VERIFY USER EMAIL

export const verifyAccountEmail = (verificationCode, history) => {
    return (dispatch, getState) => {

        dispatch({
            type : VERIFYING_EMAIL
        })

        const token = getState().auth.token
        
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        
        if (token) {
            config.headers["x-auth-token"] = token
        }

        const data = { verificationCode }

        axios.patch(`${baseUrl}/email/verification`, data, config)
        .then(res => {
            dispatch({
                type : VERIFIED_EMAIL,
                payload : res.data.message
            })
            
            history.push('/profile')
        })
        .catch(error =>{
            
            dispatch({
                type : VERIFIED_EMAIL_FAILED,
                payload : error.response.data.message
            })
        })
    }
}





//TO SEND VERIFICATION CODE TO USER'S EMAIL

export const sendVerificationCode = (setCodeNumber) => {
    return (dispatch, getState) => {

        dispatch({
            type : SENDING_VERIFICATION_CODE
        })

        const token = getState().auth.token
        
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        
        if (token) {
            config.headers["x-auth-token"] = token
        }

        axios.patch(`${baseUrl}/verification/code`, null, config)
        .then(res => {
            dispatch({
                type : SEND_VERIFICATION_CODE,
                payload : res.data.message
            })

            setCodeNumber(null)
        })
        .catch(error =>{
            dispatch({
                type : SEND_VERIFICATION_CODE_FAILED,
                payload : error.response.data.message
            })
        })
    }
    
}






// TO DELETE USER'S ACCOUNT FROM THE DATABASE
export const deleteAccount = (history) => {
    return (dispatch, getState) => {
        dispatch({
            type : DELETING_ACCOUNT
        })
        

        const token = getState().auth.token
        

        axios.delete(`${baseUrl}/delete/user`, { data: null, headers: {"x-auth-token": token } })
        .then(res => {
            console.log(res)
            dispatch({
                type : DELETED_ACCOUNT,
                payload : res.data.message
            })
            history.push('/')
        })
        .catch(error =>{
            dispatch({
                type : DELETE_ACCOUNT_FAILED,
                payload : error.response.data.message
            })
        })
    }
}






//LOGOUT USER FROM THE APPLICATION

export const logoutUser = (history) => {
    return (dispatch, getState) =>{
        dispatch({
            type : LOGGED_OUT
        })

        history.push('/signin')
    }
}



//CLOSE SNACKBAR
export const closeSnackbar = () => {
    return(dispatch, getState) => {

        dispatch({
            type : CLOSE_SNACKBAR
        })

    }
}