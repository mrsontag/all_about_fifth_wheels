import React, {useEffect} from 'react';

const LinkedImage = props => {
    const { alt, src, width, height, letmagnify, linkto } = props;
    
    const imgtag = <img style={{maxWidth: width + "px", maxHeight: height + "px"}} src={src} alt={alt} />;
    
    if(typeof(linkto)!=="undefined") {
        return( 
            <a href={linkto}>{imgtag}</a>
        )
    }
    return (
        <> { imgtag } </>
    )
}

export default LinkedImage;