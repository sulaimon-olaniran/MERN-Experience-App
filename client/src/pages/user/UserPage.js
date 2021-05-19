import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'




import SpinnerLoader from '../../components/loaders/spinner_loader/SpinnerLoader'
import ProfileComponent from '../../components/profile/ProfileComponent'
import { usersUrl } from '../../api'




const UserPage = ({ match }) =>{
    const [accountDetails, setaccountDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const userId = match.params.id


    const isAuth = useSelector((state) => state.auth.isAuth)


    const handleFetchAccountDetails = useCallback(() => {
        setLoading(true)

        axios.get(`${usersUrl}/${userId}`)
            .then(res => {
                console.log(res)
                setaccountDetails(res.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [userId])



    useEffect(() => {
        handleFetchAccountDetails()

    }, [handleFetchAccountDetails])

  


    if(loading) return <SpinnerLoader />

    if(!isAuth) return <Redirect to='/signin' />
    return(
        <ProfileComponent user={accountDetails} />
    )
}



export default UserPage
