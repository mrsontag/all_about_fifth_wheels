import React from 'react';
import twitter from "../images/twitter.png";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.jpg";
import www from "../images/www.png";
import link from "../images/link.png";
import youtube from "../images/youtube.png";


const LittleLink = props => {
    
    let imgsrc = "";
    
    switch(props.imgtag) {
        case "twitter":
            imgsrc = twitter;
            break;
        case "facebook":
            imgsrc = facebook;
            break;
        case "instagram":
            imgsrc = instagram;
            break;
        case "website":
            imgsrc = www;
            break;
        case "youtube":
            imgsrc = youtube;
            break;
        default:
            imgsrc = link;
    }

    return (
        <div className="inlineblock"><a href={props.to}><img src={imgsrc} className="smalllogo" alt={props.imgtag} /></a></div>
    )
}

export default LittleLink;