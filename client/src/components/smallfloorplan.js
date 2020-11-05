import React from 'react';
import styles from "./smallfloorplan.module.css";
import SpecsTable from "./specstable";
import LinkedImage from "./linked_image";
import { Link } from '@reach/router';

const SmallFloorPlan = props => {
    const { specs } = props;
    return (
        <Link to={"/floorplan/" + specs._id}>
            <div className={styles.smallplan + " blurrywhite"}>
                <h5 className={styles.heading}>{`${specs.brand} - ${specs.model}`}</h5>
                <h6 className={styles.heading}>{`${specs.manufacturer}`}</h6>
                <LinkedImage src={specs.floorplanimg} width="180" height="100" />
                <SpecsTable specs={specs.specs} />
            </div>
        </Link>
    )
}

export default  SmallFloorPlan;

