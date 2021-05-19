import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Avatar } from '@material-ui/core'
import { green } from '@material-ui/core/colors'


import expLogo from '../assets/exp_logo.png'
import { Button } from '@material-ui/core'





const Navbar = () => {

    const isAuth = useSelector((state) => state.auth.isAuth) //IF USER IS LOGGED IN OR NOT
    const user = useSelector((state) => state.auth.user)

    return (
        <nav className='navbar-container'>
            <div className='navbar-contents-container'>

                <Link to='/'>
                    <img src={expLogo} alt="logo" />
                </Link>

                {isAuth ?
                    <div className='signedin-navbar-contents'>
                        <Link to='/create/experience'>
                            <AddCircleOutlineIcon style={{ color: green[500] }} fontSize="large" />
                        </Link>

                        <Link to={`/profile`}>
                            <Avatar src={user?.profileImage}/>
                        </Link>

                    </div>
                    :
                    <div className="signedout-navbar-contents">
                        <Link  to="/signin">
                            <Button variant="outlined" style={{ color: green[500] }}>
                                Sign In
                            </Button>
                        </Link>
                        <Link to='/signup'>
                            <Button variant='contained' style={{ backgroundColor: green[500], color : "white" }}>
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                }

            </div>
        </nav>
    )
}




export default Navbar