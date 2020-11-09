import React, { useState, useEffect } from 'react';
import LinkedImage from './linked_image';
import SpecsTable from './specstable';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import { useNavigate } from '@reach/router';
import styles from './floorplanpage.module.css';

//import { Link } from '@reach/router';

const FloorPlanPage = props => {
    const [fiver, setFiver] = useState({});
    const [specs, setSpecs] = useState({});
    useEffect(() => {
        Axios.get("http://localhost:8000/api/fivers/"+ props.id)
            .then(res => { console.log(res); setFiver(res.data); setSpecs(res.data.specs) })
            .catch(err => console.log(err));
    },[])

    const leftside = {
        "length": specs.length,
        "width": specs.width,
        "height": specs.height,
        "weight": specs.weight,
        "Overall Floor Plan": "tbd"
    }

    const ThreeDLink = () => {
        if(typeof(fiver.threedtourlink) !== "undefined") {
            return(
                <Button className = {styles.buttons} color="primary" onClick={()=> Navigate(fiver.threedtourlink)}>Link to 3D Walkthrough</Button>
            )
        }
        return;
    }

    const Navigate = useNavigate();

    return (
        <div className="blurrywhite">    
            <h2>{fiver.brand + " " + fiver.model}</h2>
            <div className={styles.editbutton}>
                <Button  color="default" size="small" onClick={()=> Navigate("/floorplan/edit/" + props.id)} >Edit</Button>
            </div>
            <h3>{fiver.manufacturer}</h3>
            <LinkedImage 
                src={fiver.floorplanimg}
                linkto={fiver.pagelink}
                alt={"Floor plan for " + fiver.manufacturer + " " + fiver.brand + " " + fiver.model} 
                width="900" 
                height="600" 
            />
            <div className={styles.buttoncontainer}>
                <Button className = {styles.buttons} color="primary" onClick={()=> Navigate(fiver.pagelink)}>Manufacturers Page</Button>
                { ThreeDLink() }
            </div>
            <div className="half-column">
                <SpecsTable specs={leftside} />
            </div>
        </div>
    )
}

export default FloorPlanPage;