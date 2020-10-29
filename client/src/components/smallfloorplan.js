import React from 'react';
import styles from "./smallfloorplan.module.css";
import SpecsTable from "./specstable";
import LinkedImage from "./linked_image";

const SmallFloorPlan = props => {
    const { imgsource } = props;
    const specs = {
        "Length": 37,
        "Width": 103,
        "Height": `13'4"`,
        "Weight": '11010 lbs',
        "Overall Floor Plan": "Front Kitchen"
    }
    return (
        <div className={styles.smallplan}>
            <LinkedImage src={imgsource} width="180" height="100" />
            <SpecsTable specs={specs} />
        </div>
    )
}

export default  SmallFloorPlan;

