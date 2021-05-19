import axios from 'axios'


import { experiencesUrl } from '../../api'


import {
    //FETCHING_EXPERIENCES,
    FETCH_EXPERIENCES,
    FETCH_EXPERIENCE_FAILED,
    CREATING_EXPERIENCE,
    CREATE_EXPERIENCE,
    DISLIKE_EXPERIENCE,
    DELETING_EXPERIENCE,
    DELETE_EXPERIENCE,
    DELETE_EXPERIENCE_FAILED,
    LIKE_EXPERIENCE,
    COMMENT_EXPERIENCE,
    SAVED_EXPERIENCE,
    SAVED_EXPERIENCE_ERROR,
    UNSAVED_EXPERIENCE,
    UNSAVED_EXPERIENCE_ERROR,
    LIKE_COMMENT,
    LIKE_COMMENT_FAILED,
    UNLIKE_COMMENT,
    UNLIKE_COMMENT_FAILED,
    DELETE_COMMENT_FAILED,
    DELETE_COMMENT,
    CREATE_EXPERIENCE_ERROR,
    CLOSE_SNACKBAR,
    LIKE_EXPERIENCE_FAILED,
    DISLIKE_EXPERIENCE_FAILED,
    COMMENT_EXPERIENCE_ERROR
}
    from '../../constants/actionTypes'


const baseUrl = experiencesUrl




//FETCH ALL EXPERINCE FROM THE SERVER AND SAVE IT TO REDUX STORE

export const getAllExperiences = () => {
    return (dispatch, getState) => {
        
        console.log("fetching experiences")

        axios.get(baseUrl)
            .then(res => {
                
                dispatch({
                    type: FETCH_EXPERIENCES,
                    payload: res.data
                })
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type : FETCH_EXPERIENCE_FAILED,
                    payload : "Failed to load Experiences"
                })
            })
    }

}





//CREATES NEW EXPERIENCE BY SENDING THE EXPERIENCE TO THE SERVER ALONG WITH THE TOKEN

export const createExperience = (data, resetForm) => {
    return (dispatch, getState) => {
       
        dispatch({ type: CREATING_EXPERIENCE })

        const token = getState().auth.token

        const config = {
            headers: {
                "x-auth-token": token
            }
        }

        axios.post(baseUrl, data, config)
            .then(res => {
                dispatch({ 
                    type: CREATE_EXPERIENCE,
                    payload : res.data.message  
                })
                resetForm({})
            })
            .catch(error => {
                dispatch({ 
                    type : CREATE_EXPERIENCE_ERROR,
                    payload : error.response.data.message
                })
                console.log(error)
            })
    }
}




//DELETE EXPERIENCE FROM THE DATABASE

export const deleteExperience = (id) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        dispatch({ type: DELETING_EXPERIENCE })

        axios.delete(`${baseUrl}/comment/delete/${id}`, { data: null, headers: {"x-auth-token": token } })
            .then((res) => {
                console.log(res)
                dispatch({ 
                    type: DELETE_EXPERIENCE,
                    payload : res.data.message  
                })
            })
            .catch(error => {
                dispatch({
                    type : DELETE_EXPERIENCE_FAILED,
                    payload : error.response.data.message
                })
                console.log(error)
            })
    }
}




//SAVES EXPERIENCE ID TO USER DATA

export const saveExperience = (id) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        const config = {
            headers: {
                "x-auth-token": token
            }
        }

        axios.patch(`${baseUrl}/${id}/save`, null, config)
            .then(res => {
                console.log(res)
                dispatch({
                    type: SAVED_EXPERIENCE,
                    payload: res.data.message
                })
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: SAVED_EXPERIENCE_ERROR,
                    payload: error.response.data.message
                })
            })
    }
}






//REMOVE SAVED EXPERIENCE FROM USER'S DATA

export const unSaveExperience = (id) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        const config = {
            headers: {
                "x-auth-token": token
            }
        }

        axios.patch(`${baseUrl}/${id}/unsave`, null, config)
            .then(res => {
                console.log(res)
                dispatch({
                    type: UNSAVED_EXPERIENCE,
                    payload: res.data.message
                })
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: UNSAVED_EXPERIENCE_ERROR,
                    payload: error.response.data.message
                })
            })
    }
}




//LIKING A CERTAIN EXPERIENCE

export const likeExperience = (id) => {
    return (dispatch, getState) => {

        const token = getState().auth.token


        const config = {
            headers: {
                "content-type": "application/json"
            }
        }


        if (token) {
            config.headers["x-auth-token"] = token
        }


        axios.patch(`${baseUrl}/${id}/like`, null, config)
            .then(res => {
                console.log(res)
                dispatch({ 
                    type: LIKE_EXPERIENCE,
                    payload : res.data.message  
                })
            })
            .catch(error => {
                dispatch({
                    type : LIKE_EXPERIENCE_FAILED,
                    payload : error.response.data.message
                })
                console.log(error)
            })
    }
}






//UNLIKING EXPERIENCE

export const unLikeExperience = (id) => {
    return (dispatch, getState) => {

        const token = getState().auth.token


        const config = {
            headers: {
                "content-type": "application/json"
            }
        }


        if (token) {
            config.headers["x-auth-token"] = token
        }

        console.log(config)

        axios.patch(`${baseUrl}/${id}/unlike`, null, config)
            .then(res => {
                console.log(res)
                dispatch({ 
                    type: DISLIKE_EXPERIENCE,
                    payload : res.data.message  
                })
            })
            .catch(error => {
                dispatch({
                    type : DISLIKE_EXPERIENCE_FAILED,
                    payload : error.response.data.message
                })
                console.log(error)
            })
    }
}






//POST A COMMENT ON AN EXPERIENCE
export const commentOnExperience = (id, comment, clear) => {
    return (dispatch, getState) => {

        const token = getState().auth.token

        const config = {
            headers: {
                "x-auth-token": token
            }
        }

        axios.patch(`${baseUrl}/${id}/comment`, comment, config)
            .then(res => {
                clear()
                dispatch({ 
                    type: COMMENT_EXPERIENCE,
                    payload : res.data.message 
                })
            })
            .catch(error => {
                dispatch({
                    type : COMMENT_EXPERIENCE_ERROR,
                    payload : error.response.data.message
                })
                console.log(error)
            })
    }
}






//LIKING A COMMENT POSTED ON AN EXPERIENCE

export const likeComment = (likeCommentData) => {
    return (dispatch, getState) => {

        const { expId, commentId } = likeCommentData


        const token = getState().auth.token


        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        const body = {
            "commentId" : commentId
        }


        if (token) {
            config.headers["x-auth-token"] = token
        }

        axios.patch(`${baseUrl}/comment/like/${expId}`, body, config)
            .then(res => {
                console.log(res)
                dispatch({ 
                    type: LIKE_COMMENT,
                    payload : res.data.message  
                })
            })
            .catch(error => {
                dispatch({ 
                    type: LIKE_COMMENT_FAILED,
                    payload : error.response.data.message
                })
                console.log(error.response.data.error)
            })
    }
}





//UNLIKING A COMMENT POSTED ON AN EXPERIENCE
export const unLikeComment = (data) => {
    return (dispatch, getState) => {

        const { expId, commentId } = data


        const token = getState().auth.token


        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        const body = {
            "commentId" : commentId
        }


        if (token) {
            config.headers["x-auth-token"] = token
        }

        axios.patch(`${baseUrl}/comment/unlike/${expId}`, body, config)
            .then(res => {
                console.log(res)
                dispatch({ 
                    type: UNLIKE_COMMENT,
                    payload : res.data.message  
                })
            })
            .catch(error => {
                dispatch({ 
                    type: UNLIKE_COMMENT_FAILED,
                    payload : error.response.data.message 
                })
                console.log(error.response.data.error)
            })
    }
}




//DELETE COMMENT IF IT WAS CREATED BY THE LOGGED IN ACCOUNT

export const deleteComment = (data) => {
    return (dispatch, getState) => {

        const { expId, commentId } = data


        const token = getState().auth.token

        
        axios.delete(`${baseUrl}/comment/delete/${expId}`, { data: { commentId: commentId }, headers: {"x-auth-token": token } })
            .then(res => {
                console.log(res)
                dispatch({ 
                    type: DELETE_COMMENT,
                    payload : res.data.message  
                })
            })
            .catch(error => {
                dispatch({ 
                    type: DELETE_COMMENT_FAILED,
                    payload : error.response.data.message 
                })
                console.log(error.response.data.message)
            })
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





        