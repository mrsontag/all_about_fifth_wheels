import React, {useState} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input'

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
    const [low, setLow] = useState(value[0]);
    const [high, setHigh] = useState(value[1]);

    const handleChange = (event, newValue) => {
        setLow(newValue[0]);
        setHigh(newValue[1]);
    };

    const changeLow = (event) => {
        setLow(event.target.value === '' ? '' : Number(event.target.value));
    };

    const changeHigh = (event) => {
        setHigh(event.target.value === '' ? '' : Number(event.target.value));
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
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <Input
                        value={low}
                        margin="dense"
                        onChange={changeLow}
                        //onBlur={handleBlur}
                        inputProps={{
                        step: "any",
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Slider
                        value={[low, high]}
                        onChange={handleChange}
                        //valueLabelDisplay="none"
                        min={ min }
                        max={ max }
                        aria-labelledby="range-slider"
                        getAriaValueText={() => `${value}°C`}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Input
                        value={high}
                        margin="dense"
                        onChange={changeHigh}
                        //onBlur={handleBlur}
                        inputProps={{
                        //step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default CriteriaBar;
