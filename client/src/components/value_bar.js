import React, {useEffect, useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { inchesToFeet } from "./feetinches";

const ValueBar = props => {
    const {fieldname, value, setValue, min, max, defvalue, intoft} = props;
    //const [value, newValue ] = useState([])
    const [display, setDisplay ] = useState(inchesToFeet(value ?? defvalue));
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
        displayValue(newValue);
    };

    const changeValue = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        setDisplay(event.target.value);
    };

    const displayValue = (whatvalue) => {
        setDisplay(document.activeElement.name === props.name + "_entry" ? whatvalue : intoft ? inchesToFeet(whatvalue) : whatvalue);
    }

    useEffect(() => {
        displayValue(value);
    }, [value] )
        
    return (
        <div >
            {fieldname}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                    <Slider value={value} onChange={handleChange} min={ min } max={ max } />
                </Grid>
                <Grid item xs={2}>
                    <input className="shortinput" type="text" name={props.name + "_entry"} value={display} onChange={changeValue} onFocus={() => displayValue(value)} onBlur={() => displayValue(value)} />
                </Grid>
            </Grid>
        </div>
    );
}

export default ValueBar;

//<Input value={value} margin="dense" onChange={changeValue} inputProps={{min: min, max: max, type: 'number', }} />