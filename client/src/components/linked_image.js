import React, { useState, useEffect } from 'react';
import styles from "./linked_image.module.css";


const LinkedImage = props => {
    const { imgid, alt, src, width, height, letmagnify, linkto } = props;
    const [over, setOver] = useState(false);
    const [imgcoord, setImgCoord ] = useState({left:0, top:0});
    const zoom = letmagnify;
    const w = 100;
    const h = 100;

    const changeOver = (value) => {
        if(!letmagnify) { return }
        if(over !== value) { 
            setOver(value)
            if(value) {
                startMagnify()
            } else {
                stopMagnify()
            }
        }
    }
    const moveMagnifier = (e) => {
        e.preventDefault();
        let img = document.getElementById(imgid + "_img");
        let magnifier = document.getElementById(imgid + "_mag");
        let pos = getCursorPos(e);
        let x = pos.x ;
        let y = pos.y;
        //let w = magnifier.offsetWidth / 2;
        //let h = magnifier.offsetHeight / 2;
        let bw = 1;
        if(x < -5 || x > img.width + 10 || y < -5 || y > img.height + 10) { 
            stopMagnify() };

        magnifier.style.left = (x - w) + "px";
        magnifier.style.top = (y - h) + "px"; 
        
        /* Display what the magnifier magnifier "sees": */
        magnifier.style.backgroundPosition =  -1 * ((x * zoom) - w + bw) + "px " + -1* ((y * zoom) - h + bw) + "px";
    }
    const stopMagnify = () => {
        let img = document.getElementById(imgid + "_img");
        let magnifier = document.getElementById(imgid + "_mag");
        magnifier.style.display = "none";
        magnifier.removeEventListener ("mousemove", moveMagnifier);
        magnifier.removeEventListener("touchmove", moveMagnifier);
        img.removeEventListener("mousemove", moveMagnifier);
        img.removeEventListener("touchmove", moveMagnifier);
    }

    const startMagnify = () => {
        let img = document.getElementById(imgid + "_img");
        let magnifier = document.getElementById(imgid + "_mag");
        magnifier.style.display = "block";
        
        magnifier.addEventListener("mousemove", moveMagnifier);
        magnifier.addEventListener("touchmove", moveMagnifier);
    
        img.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);
        magnifier.style.backgroundSize = `${img.width*zoom}px ${img.height*zoom}px`
    }
    
    const getCursorPos = (e) => {
        let img = document.getElementById(imgid + "_img");
        let x = 0;
        let y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        let a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    useEffect(() => {
        let img = document.getElementById(imgid + "_img");
        let magnifier = document.getElementById(imgid + "_mag");
        setImgCoord(img.getBoundingClientRect());

    },[]);


    const magtag = letmagnify ? <div id={imgid + "_mag"} style={{backgroundImage: `url('${src}')`}} className={styles.imgmagnifier}></div> : <> </>;
    const imgtag = <img className={styles.images} id={imgid + "_img"} style={{ maxWidth: width + "px", maxHeight: height + "px" }} src={src} alt={alt} />;
    
    if (typeof (linkto) !== "undefined") {
        return (
            <div className={styles.imgcontainer} onMouseOver={() => changeOver(true)} onMouseOut={() => changeOver(false)} >{magtag}<a href={linkto}>{imgtag}</a></div>
        )
    }
    return (
        <div className={styles.imgcontainer} onMouseOver={() => changeOver(true)} onMouseOut={() => changeOver(false)} > {magtag}{ imgtag}</div>
    )
}

export default LinkedImage;