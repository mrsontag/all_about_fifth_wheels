import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input'


const CriteriaBar = props => {
    const {fieldname, criteria, setCriteria, criteriapath, min, max} = props;
    //const [value, newValue ] = useState([])

    
    const [low, setLow] = useState(criteria[criteriapath] ? criteria[criteriapath].min : min);
    const [high, setHigh] = useState(criteria[criteriapath] ? criteria[criteriapath].max : max);

    
    const handleChange = (event, newValue) => {
        if(newValue[0] === min && newValue[1] === max) {
            setCriteria({
                ...criteria,
                [criteriapath]: undefined
            })
        } else {
            setCriteria({
                ...criteria, 
                [criteriapath]: {
                    name: fieldname,
                    type: "range",
                    min: newValue[0],
                    max: newValue[1]
                }
            })
        }
        setLow(newValue[0]);
        setHigh(newValue[1]);
    };

    const changeLow = (event) => {
        setLow(event.target.value === '' ? '' : Number(event.target.value));
    };

    const changeHigh = (event) => {
        setHigh(event.target.value === '' ? '' : Number(event.target.value));
    };

    const formattedFieldName = () => {
        if(typeof(criteria[criteriapath]) !== "undefined") {
            return(
                <>
                    {fieldname}
                </>
            )
        } else {
            return(
                <strike>
                    {fieldname}
                </strike>
            );
        }
        
    }

    return (
        <div >
            {formattedFieldName()}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <Input value={low} margin="dense" onChange={changeLow} inputProps={{step: "any", min: min, max: max, type: 'number' }} />
                </Grid>
                <Grid item xs={6}>
                    <Slider value={[low, high]} onChange={handleChange} min={ min } max={ max } />
                </Grid>
                <Grid item xs={3}>
                    <Input value={high} margin="dense" onChange={changeHigh} inputProps={{min: min, max: max, type: 'number', }} />
                </Grid>
            </Grid>
        </div>
    );
}

export default CriteriaBar;
