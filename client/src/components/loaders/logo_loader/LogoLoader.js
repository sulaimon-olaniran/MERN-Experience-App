import React from 'react'
import BarLoader from "react-spinners/BarLoader"


import expLogo from '../../assets/exp_logo.png'



//UNIVERSAL APP LOADER WHEN APP IS INNITIALIZING

const LogoLoader = () => {
    return(
        <div 
            style={{ 
                    width : "100%", 
                    minHeight : "100vh", 
                    display : "flex", 
                    flexDirection : 'column',
                    justifyContent : "center", 
                    alignItems : "center"
                }}
            >

            <img 
                src={expLogo} 
                alt="logo"  
                style={{ 
                    width : '100px', 
                    height : "70px", 
                    marginBottom : '10px'}} 
                />

            <BarLoader color="#0B7C62" />
        </div>
    )
}


export default LogoLoader