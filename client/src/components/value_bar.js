import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input'

const ValueBar = props => {
    const {fieldname, value, setValue, min, max, defvalue} = props;
    //const [value, newValue ] = useState([])
    
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeValue = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    return (
        <div >
            {fieldname}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                    <Slider value={value} onChange={handleChange} min={ min } max={ max } />
                </Grid>
                <Grid item xs={4}>
                    <Input value={value} margin="dense" onChange={changeValue} inputProps={{min: min, max: max, type: 'number', }} />
                </Grid>
            </Grid>
        </div>
    );
}

export default ValueBar;
