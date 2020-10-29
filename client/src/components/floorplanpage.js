import React from 'react';
import LinkedImage from './linked_image';
import SpecsTable from './specstable';

const FloorPlanPage = props => {

    const leftside = {
        "Length": 37,
        "Width": 103,
        "Height": `13'4"`,
        "Weight": '11010 lbs',
        "Overall Floor Plan": "Front Kitchen"
    }
    return (
        <div>
            <LinkedImage src="https://www.keystonerv.com/media/9154340/montana-3120rl-2021.png" linkto="https://www.keystonerv.com" alt="Floor plan for Keystone Montana 3120RL" width="900" height="600" />
            <div className="half-column">
                <SpecsTable specs={leftside} />
            </div>
        </div>
    )
}

export default FloorPlanPage;