import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactCodeInput from 'react-verification-code-input'
import Button from '@material-ui/core/Button'
import { green } from '@material-ui/core/colors'




import { verifyAccountEmail, sendVerificationCode } from '../../store/actions/auth'







const VerificationPage = ({ history }) => {
    const [codeNumber, setCodeNumber] = useState(null)
    

    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user)
    const isAuth = useSelector((state) => state.auth.isAuth)

    
    
    if(!isAuth) return <Redirect to='/signin' />

    if(user.isVerified) return <Redirect to='/profile' />

    return (
        <div className="verification-page-container">
            <div className="verification-page-sub-container">
                <h1>Email Verificatoin</h1> 

                <p>Please verify your account email with the six(6) digit code sent to your email address. Without email verification, you won't have access to comment, like or save an Experience.</p>

                <div className='verification-page-input-container'>
                    <ReactCodeInput
                        type='number'
                        onComplete={setCodeNumber}
                    />
                </div>


                <div className="verification-page-buttons-container">
                    <Button
                        variant='contained'
                        style={{ backgroundColor: green[500], color: "white" }}
                        onClick = { () => dispatch(verifyAccountEmail(codeNumber, history))}
                        disabled={codeNumber === null}
                    >
                        Verify Email
                </Button>

                    <Button
                        variant='contained'
                        color='primary'
                        onClick = { () => dispatch(sendVerificationCode(setCodeNumber))}
                    >
                        Send Code
                </Button>
                </div>
            </div>
        </div>
    )
}




export default VerificationPage