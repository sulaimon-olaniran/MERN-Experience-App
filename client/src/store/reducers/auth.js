import {
    FETCHED_ACCOUNT,
    SIGNING_UP,
    SIGNED_UP,
    SIGN_UP_ERROR,
    LOGGED_OUT,
    SIGNING_IN,
    SIGNED_IN,
    SIGN_IN_ERROR,
    FETCHED_ACCOUNT_FAILED,
    UPDATE_ACCOUNT_FAIL,
    UPDATING_ACCOUNT,
    UPDATED_ACCOUNT,
    CLOSE_SNACKBAR,
    DELETING_ACCOUNT,
    DELETED_ACCOUNT,
    DELETE_ACCOUNT_FAILED,
    VERIFIED_EMAIL,
    VERIFYING_EMAIL,
    VERIFIED_EMAIL_FAILED,
    SENDING_VERIFICATION_CODE,
    SEND_VERIFICATION_CODE,
    SEND_VERIFICATION_CODE_FAILED
} from '../../constants/actionTypes'


const initState = {
    token : localStorage.getItem('token'),
    isAuth : false,
    actionLoader : false,
    fetchingAccount : true,
    updatingAccount : false,
    updateAccountError : null,
    signingUp : false,
    signingIn : false,
    user : null,
    signUpError : null,
    signInError : null,
    authSnackbar : false,
    authSnackbarText : '',
    authSnackbarSeverity : '',
    deletingAccount : false
}





const authReducer = (state = initState, action) => {
    switch (action.type) {


        case FETCHED_ACCOUNT:
            return {
                ...state,
                fetchingAccount : false,
                isAuth : true,
                user : action.payload
            }


        case FETCHED_ACCOUNT_FAILED:
            return {
                ...state,
                fetchingAccount : false,
                isAuth : false,
                user : null,
            }
        
        case UPDATING_ACCOUNT:
            return {
                ...state,
                actionLoader : true,
            }


        case UPDATED_ACCOUNT:
            return {
                ...state,
                actionLoader : false,
                user : action.payload,
                authSnackbar : true,
                authSnackbarText : "Updated profile successfully",
                authSnackbarSeverity : 'success'
            }

        case UPDATE_ACCOUNT_FAIL:
            return {
                ...state,
                updateAccountError : action.payload,
                actionLoader : false,
                authSnackbar : true,
                authSnackbarText : "Profile update failed",
                authSnackbarSeverity : 'error'

            }
        
        case SIGNING_IN:
            return {
                ...state,
                signingIn : true
            }


        case SIGNING_UP:
            return {
                ...state,
                signingUp : true
            }
            
        case SIGNED_UP:
        case SIGNED_IN:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                isAuth : true,
                ...action.payload,
                signingUp : false,
                signingIn : false,
                authSnackbar : true,
                authSnackbarText : "Welcome to Experience",
                authSnackbarSeverity : 'success'
            }
            
        case SIGN_UP_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuth : false,
                signingUp : false,
                token: null,
                authSnackbar : true,
                authSnackbarText : action.payload,
                authSnackbarSeverity : 'error'
            }
            
        case SIGN_IN_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuth : false,
                signingIn : false,
                token: null,
                authSnackbar : true,
                authSnackbarText : action.payload,
                authSnackbarSeverity : 'error'
            }
            
        case VERIFYING_EMAIL:
        case SENDING_VERIFICATION_CODE :
            
            return {
                ...state,
                actionLoader : true,
            }
            
        case VERIFIED_EMAIL:
        case SEND_VERIFICATION_CODE:
        
            return {
                ...state,
                actionLoader : false,
                authSnackbar : true,
                authSnackbarText : action.payload,
                authSnackbarSeverity : 'success'
            }
            
        case VERIFIED_EMAIL_FAILED:
        case SEND_VERIFICATION_CODE_FAILED:
        
            return {
                ...state,
                actionLoader : false,
                authSnackbar : true,
                authSnackbarText : action.payload,
                authSnackbarSeverity : 'error'
            }
            
        case LOGGED_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                user : null,
                isAuth : false,
                token: null,
            }
            
        case DELETING_ACCOUNT:

            return {
                ...state,
                actionLoader : true,
            }
            
        case DELETED_ACCOUNT:
            localStorage.removeItem('token')
            return {
                ...state,
                user : null,
                isAuth : false,
                token: null,
                actionLoader : false,
                authSnackbar : true,
                authSnackbarText : action.payload,
                authSnackbarSeverity : 'success'
            }
            
        case DELETE_ACCOUNT_FAILED:
            
            return {
                ...state,
                actionLoader : false,
                authSnackbar : true,
                authSnackbarText : action.payload,
                authSnackbarSeverity : 'error'
            }
            
        case CLOSE_SNACKBAR:
            return {
                ...state,
                authSnackbar : false,
                authSnackbarSeverity : '',
                authSnackbarText : ''
            }

        default : return state

    }
}



export default authReducer