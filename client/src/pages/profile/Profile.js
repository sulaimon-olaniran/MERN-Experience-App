import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'





import ProfileComponent from '../../components/profile/ProfileComponent'





const ProfilePage = () =>{
    const user = useSelector((state) => state.auth.user)
    const isAuth = useSelector((state) => state.auth.isAuth)

    if(!isAuth) return <Redirect to='/signin' />
    return(
        <ProfileComponent user={ user } from={"profile"} />
    )
}



export default ProfilePage