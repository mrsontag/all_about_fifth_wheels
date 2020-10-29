import React, { useState, useEffect } from 'react';
import LinkedImage from './linked_image';
import SpecsTable from './specstable';
import Axios from 'axios';
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
                <a href={fiver.threedtourlink}>Link to 3D Walkthrough</a>
            )
        }
        return;
    }
    return (
        <div>
            <h2>{fiver.brand + " " + fiver.model}</h2>
            <h3>{fiver.manufacturer}</h3>
            <LinkedImage 
                src={fiver.floorplanimg}
                linkto={fiver.pagelink}
                alt={"Floor plan for " + fiver.manufacturer + " " + fiver.brand + " " + fiver.model} 
                width="900" 
                height="600" 
            />
            { ThreeDLink() }
            <div className="half-column">
                <SpecsTable specs={leftside} />
            </div>
        </div>
    )
}

export default FloorPlanPage;