//import { StylesProvider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CriteriaHamburger from "./criteriahamburger";
import styles from "./search.module.css";
import SmallFloorPlan from "./smallfloorplan";
import Axios from 'axios';
import { set } from 'lodash';

const _ = require('lodash');

const Search = props => {
    const [showsearch, setShowSearch ] = useState(false);
    const [allplans, setAllPlans] = useState([]);
    const [results, setResults ] = useState([]);
    const [whichcriteria, setWhichCriteria] = useState(true);

    const [criteria, setCriteria ] = useState({
            "specs.length": {
                type: "range",
                min: 20,
                max: 60
            },
            "specs.height": {
                type: "range",
                min: 10,
                max: 20
            }
        });

    useEffect(() => {
        Axios.get("http://localhost:8000/api/fivers/")
            .then(res => { setAllPlans(res.data); setResults(res.data) })
            .catch(err => console.log(err));
    },[])

    useEffect(() => {
        setResults(allplans.filter(matchesSearch));
    }, [criteria]);

    const changeCriteria = () => {
        if (whichcriteria) {
            setCriteria( {
                "specs.length": {
                    type: "range",
                    min: 37,
                    max: 45
                },
                "specs.height": {
                    type: "range",
                    min: 13.2,
                    max: 15
                }
            });
        } else {
            setCriteria({
                "specs.length": {
                    type: "range",
                    min: 20,
                    max: 60
                },
                "specs.height": {
                    type: "range",
                    min: 10,
                    max: 20
                }
            });
        }
        setWhichCriteria(!whichcriteria)
    }
    
    const matchesSearch = (fiver) => {
        let filterkeys = Object.keys(criteria);
        for(let i=0; i<filterkeys.length; i++) {
            switch(criteria[filterkeys[i]].type) {
                case "range":
                    let value = parseFloat(_.get(fiver, filterkeys[i]));
                    //console.log("Value is:" + value + ", Criteria Min is " + criteria[i].min + " and Max is " + criteria[i].max);
                    if( criteria[filterkeys[i]].min > value || value > criteria[filterkeys[i]].max) { return false };
                    break;
            }
        }
        return true;
    }

    const SearchBlock = () => {
        if(showsearch) {
            return (
                <>
                <div className={styles.floatingburger} onClick={(e) => e.stopPropagation()}>
                    <CriteriaHamburger criteria={criteria} setCriteria={setCriteria}/>
                </div>
                <div>Show Search</div>
                </>
            )
        }
        return (
            <div onClick={(e) => { e.stopPropagation(); setShowSearch(true)}}>Show Search</div>
        )
    }

    return(
        <div className={styles.relativepos} onClick={() => setShowSearch(false)}>
            { SearchBlock() }
            <div>
                { results.length > 0 && results.map( (fiver) => {
                    return( 
                        <SmallFloorPlan specs={fiver}/>   
                    )})
                }
            </div>
            <button type="button" name="changecriteria" onClick={changeCriteria}>Click to change criteria</button>
        </div>
    );
}

export default Search;

