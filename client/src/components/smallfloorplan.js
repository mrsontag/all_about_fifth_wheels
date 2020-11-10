import React from 'react';
import styles from "./smallfloorplan.module.css";
import SpecsTable from "./specstable";
import LinkedImage from "./linked_image";
import { useNavigate } from '@reach/router';

const SmallFloorPlan = props => {
    const { specs, showwhich } = props;
    const Navigate = useNavigate();
    
    return (
        <div className={styles.smallplan + " blurrywhite"} onClick={()=>Navigate("/floorplan/" + specs._id)}>
            <h5 className={styles.heading}>{`${specs.brand} - ${specs.model}`}</h5>
            <h6 className={styles.heading}>{`${specs.manufacturer}`}</h6>
            <LinkedImage imgid={specs._id} src={specs.floorplanimg} width="180" height="100" letmagnify={5}/>
            <SpecsTable specs={specs.specs} showwhich={showwhich}/>
        </div>
    )
}

export default  SmallFloorPlan;

//<Link to={"/floorplan/" + specs._id}>