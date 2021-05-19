import { 
    FETCH_EXPERIENCES,
    FETCH_EXPERIENCE_FAILED,
    CREATING_EXPERIENCE, 
    CREATE_EXPERIENCE, 
    LIKE_EXPERIENCE, 
    DISLIKE_EXPERIENCE,
    DELETING_EXPERIENCE, 
    DELETE_EXPERIENCE, 
    CLOSE_SNACKBAR,
    CREATE_EXPERIENCE_ERROR,
    LIKE_EXPERIENCE_FAILED,
    DISLIKE_EXPERIENCE_FAILED,
    SAVED_EXPERIENCE,
    SAVED_EXPERIENCE_ERROR,
    UNSAVED_EXPERIENCE,
    UNSAVED_EXPERIENCE_ERROR,
    COMMENT_EXPERIENCE,
    COMMENT_EXPERIENCE_ERROR,
    LIKE_COMMENT,
    LIKE_COMMENT_FAILED,
    UNLIKE_COMMENT,
    UNLIKE_COMMENT_FAILED
} from '../../constants/actionTypes'


const initState = {
    fetchingExperiences : true,
    openSnackbar : false,
    actionsLoader : false,
    snackbarText : "",
    snackbarSeverity : "",
    experiences : []
}





const experiencesReducer = (state = initState, action) => {
    switch (action.type) {


        case FETCH_EXPERIENCES:
            return {
                ...state,
                experiences : action.payload,
                fetchingExperiences : false
            }

        case FETCH_EXPERIENCE_FAILED:
            return {
                ...state,
                openSnackbar : true,
                snackbarText : action.payload,
                snackbarSeverity : 'error',
                fetchingExperiences : false
            }


        case CREATING_EXPERIENCE:
            return {
                ...state,
                actionsLoader : true,
                creatingExperience : true,
            }


        case CREATE_EXPERIENCE:
            return {
                ...state,
                actionsLoader : false,
                openSnackbar : true,
                snackbarText : "Experience shared successfully",
                snackbarSeverity : 'success'
            }

        case CREATE_EXPERIENCE_ERROR :
            return {
                ...state,
                actionsLoader : false,
                openSnackbar : true,
                snackbarText : action.payload,
                snackbarSeverity : 'error'
            }


        case LIKE_EXPERIENCE:
        case DISLIKE_EXPERIENCE:
        case SAVED_EXPERIENCE:
        case UNSAVED_EXPERIENCE:
        case COMMENT_EXPERIENCE:
        case LIKE_COMMENT:
        case UNLIKE_COMMENT:
        
            return {
                ...state,
                openSnackbar : true,
                snackbarText : action.payload,
                snackbarSeverity : 'success'
            }

        case LIKE_EXPERIENCE_FAILED:
        case DISLIKE_EXPERIENCE_FAILED:
        case SAVED_EXPERIENCE_ERROR:
        case UNSAVED_EXPERIENCE_ERROR:
        case COMMENT_EXPERIENCE_ERROR:
        case LIKE_COMMENT_FAILED:
        case UNLIKE_COMMENT_FAILED:
            return {
                ...state,
                openSnackbar : true,
                snackbarText : action.payload,
                snackbarSeverity : 'error'
            }

        
        case DELETING_EXPERIENCE:
            return {
                ...state,
                actionsLoader : true
            }

        
        case DELETE_EXPERIENCE:
            return {
                ...state,
                actionsLoader : false,
                openSnackbar : true,
                snackbarText : "Experience deleted successfully",
                snackbarSeverity : 'success'
            }


        case CLOSE_SNACKBAR :
            return {
                ...state,
                openSnackbar : false,
                snackbarText : '',
                snackbarSeverity : ''
            }

        default : return state

    }
}



export default experiencesReducer