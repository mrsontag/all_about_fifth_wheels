import React, {useState} from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { inchesToFeet } from "./feetinches";
import _ from 'lodash';

const CriteriaBar = props => {
    const {fieldname, criteria, setCriteria, criteriapath, min, max, intoft = false} = props;

    const [disabled, setDisabled] = useState(typeof(criteria[criteriapath]) === "undefined")
    
    const [low, setLow] = useState(criteria[criteriapath] ? criteria[criteriapath].min : min);
    const [high, setHigh] = useState(criteria[criteriapath] ? criteria[criteriapath].max : max);
    const [displayhigh, setDisplayHigh ] = useState(intoft ? 
        inchesToFeet(criteria[criteriapath] ? criteria[criteriapath].max : max) :
        criteria[criteriapath] ? criteria[criteriapath].max : max);
    const [displaylow, setDisplayLow ] = useState(intoft ? 
        inchesToFeet(criteria[criteriapath] ? criteria[criteriapath].min : min) :
        criteria[criteriapath] ? criteria[criteriapath].min : min);
    
    
    const handleChange = (event, newValue) => {
        if(newValue[0] === min && newValue[1] === max) {
            setCriteria({
                ...criteria,
                [criteriapath]: undefined
            })
            setDisabled(true);
        } else {
            setCriteria({
                ...criteria, 
                [criteriapath]: {
                    name: fieldname,
                    type: "range",
                    intoft: intoft ?? false,
                    min: newValue[0],
                    max: newValue[1]
                }
            })
            setDisabled(false);
        }
        setLow(newValue[0]);
        setHigh(newValue[1]);
        displayLow(newValue[0])
        displayHigh(newValue[1])
    };

    const labelclick = () => {
        if(disabled) {
            setCriteria({
                ...criteria, 
                [criteriapath]: {
                    name: fieldname,
                    type: "range",
                    min: low,
                    max: high
                }
            })
            setDisabled(false);
        } else if(low === min && high === max) {
            setCriteria({
                ...criteria,
                [criteriapath]: undefined
            })
            setDisabled(true);
        }
        
    }
    const changeLow = (event) => {
        setLow(event.target.value === '' ? '' : Number(event.target.value));
        displayLow(event.target.value);
    };

    const changeHigh = (event) => {
        setHigh(event.target.value === '' ? '' : Number(event.target.value));
        displayHigh(event.target.value);
    };

    const displayHigh = (whatvalue) => {
        setDisplayHigh(document.activeElement.name === criteriapath + "_high" ? whatvalue : intoft ? inchesToFeet(whatvalue) : whatvalue);
    }

    const displayLow = (whatvalue) => {
        setDisplayLow(document.activeElement.name === criteriapath + "_low" ? whatvalue : intoft ? inchesToFeet(whatvalue) : whatvalue);
    }


    return (
        <div className="criteriamed">
            <span style={disabled ? {color: "grey", fontStyle: "italic" } : {}}
                onClick={labelclick}>{fieldname}</span>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <input className="veryshortinput" type="text" name={criteriapath + "_low"} value={displaylow} onChange={changeLow} onFocus={() => displayHigh(low)} onBlur={() => displayHigh(low)} />
                    {/*<Input value={low} margin="dense" onChange={changeLow} inputProps={{step: "any", min: min, max: max, type: 'number' }} />*/}
                </Grid>
                <Grid item xs={6}>
                    <Slider value={[low, high]} onChange={handleChange} min={ min } max={ max } />
                </Grid>
                <Grid item xs={3}>
                    <input className="veryshortinput" type="text" name={criteriapath + "_high"} value={displayhigh} onChange={changeHigh} onFocus={() => displayHigh(high)} onBlur={() => displayHigh(high)} />
                    {/*<Input value={high} margin="dense" onChange={changeHigh} inputProps={{min: min, max: max, type: 'number', }} />*/}
                </Grid>
            </Grid>
        </div>
    );
}

export default CriteriaBar;
