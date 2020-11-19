import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import LittleLink from "./littlelink";
import LinkedImage from "./linked_image";
import styles from "./resources.module.css";

const Resources = () => {
    const [resources, setResources] = useState([])
    useEffect(() => {
        Axios.get("http://localhost:8000/api/resources/")
            .then(res => setResources(res.data))
            .catch(err => console.log(err));
    },[])
    


    return(
        <div className="blurrywhite">
            {resources.length && resources.map((rsrc) => {
                return(
                    <div key={rsrc._id} className="blurrywhite">
                        <h3>{rsrc.title}</h3>
                        <div className={styles.logoblock}> 
                            { rsrc.logoimg ? <LinkedImage alt={rsrc.title + " logo image"} src={rsrc.logoimg} width={150} height={150}  /> : <p></p> }
                        </div>
                        <div className={styles.textblock}>
                            <p>{rsrc.description}</p>
                            <div>
                                { rsrc.links && Object.keys(rsrc.links).map((key) => {
                                    return(
                                        <LittleLink key={rsrc._id + "_" + key} to={rsrc.links[key]} imgtag={key} />
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.divider}></div>

                    </div>
                )
            })}
        </div>
    )
}

export default Resources;
