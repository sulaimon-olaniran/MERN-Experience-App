

let usersApi = ''
let experiencesApi = ''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

    experiencesApi = 'http://localhost:5000/experiences'
    usersApi = 'http://localhost:5000/users'
    
   

} else {

    experiencesApi = process.env.REACT_APP_EXPERIENCE_API
    usersApi = process.env.REACT_APP_USERS_API

}



export const experiencesUrl = experiencesApi
export const usersUrl = usersApi