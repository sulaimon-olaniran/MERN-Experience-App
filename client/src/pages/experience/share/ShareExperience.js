import React from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share"






const ShareExperience = ({ experienceId }) => {

    const iconSize = 30
    const sharedLink = `https://os-experience.netlify.app/experience/${experienceId}`
    
    return(
        <div className="experience-page-share-experience-container">
            <div className="each-share-experience-container">
                    <EmailShareButton url={sharedLink}>
                        <EmailIcon round={true} size={iconSize}/>
                    </EmailShareButton>
                </div>

                <div className="each-share-experience-container">

                    <FacebookShareButton  url={sharedLink}>
                        <FacebookIcon round={true} size={iconSize}/>
                    </FacebookShareButton>

                </div>

                <div className="each-share-experience-container">

                    <LinkedinShareButton  url={sharedLink}>
                        <LinkedinIcon round={true} size={iconSize}/>
                    </LinkedinShareButton>

                </div>

                <div className="each-share-experience-container">

                    <TelegramShareButton  url={sharedLink}>
                        <TelegramIcon round={true} size={iconSize}/>
                    </TelegramShareButton>

                </div>

                <div className="each-share-experience-container">

                    <TwitterShareButton  url={sharedLink}>
                        <TwitterIcon round={true} size={iconSize}/>
                    </TwitterShareButton>

                </div>

                <div className="each-share-experience-container">

                    <WhatsappShareButton  url={sharedLink}>
                        <WhatsappIcon round={true} size={iconSize}/>
                    </WhatsappShareButton>

                </div>
        </div>
    )
}



export default ShareExperience