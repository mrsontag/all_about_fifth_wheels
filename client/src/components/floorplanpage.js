import React, { useState, useEffect } from 'react';
import LinkedImage from './linked_image';
import SpecsTable from './specstable';
import Axios from 'axios';

const FloorPlanPage = props => {
    const [fiver, setFiver] = useState({});
    const [specs, setSpecs] = useState({});
    useEffect(() => {
        Axios.get("http://localhost:8000/api/fivers/"+ props.id)
            .then(res => { console.log(res); setFiver(res.data); setSpecs(res.data.specs) })
            .catch(err => console.log(err));
    },[])

    const leftside = {
        "Length": specs.length,
        "Width": specs.width,
        "Height": specs.height,
        "Weight": specs.weight,
        "Overall Floor Plan": "tbd"
    }
    return (
        <div>
            <LinkedImage 
                src={fiver.floorplanimg}
                linkto={fiver.pagelink}
                alt={"Floor plan for " + fiver.manufacturer + " " + fiver.brand + " " + fiver.model} 
                width="900" 
                height="600" 
            />
            <div className="half-column">
                <SpecsTable specs={leftside} />
            </div>
        </div>
    )
}

export default FloorPlanPage;