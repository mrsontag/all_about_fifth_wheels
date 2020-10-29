import React from 'react';
import styles from "./smallfloorplan.module.css";
import SpecsTable from "./specstable";
import LinkedImage from "./linked_image";
import { Link } from '@reach/router';

const SmallFloorPlan = props => {
    const { specs } = props;
    return (
        <Link to={"/floorplan/" + specs._id}>

            <div className={styles.smallplan}>
                <LinkedImage src={specs.floorplanimg} width="180" height="100" />
                <SpecsTable specs={specs.specs} />
            </div>
        </Link>
    )
}

export default  SmallFloorPlan;

