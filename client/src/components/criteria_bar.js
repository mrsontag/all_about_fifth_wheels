import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


/*const useStyles = makeStyles({
    root: {
        width: 300,
    },
});
*/

function valuetext(value) {
    return `${value}°C`;
}

const CriteriaBar = props => {
    //const classes = useStyles();
    const {fieldname, value, setvalue, min, max} = props;

    const handleChange = (event, newValue) => {
        setvalue(newValue);
    };
//className={classes.root}
/*
<Typography id="range-slider" gutterBottom>
                {fieldname}
            </Typography>
            
            */
    return (
        <div >
            {fieldname}
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={ min }
                max={ max }
                aria-labelledby="range-slider"
                getAriaValueText={() => `${value}°C`}
            />
        </div>
    );
}

export default CriteriaBar;
