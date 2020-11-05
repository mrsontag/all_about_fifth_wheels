//import { StylesProvider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styles from "./search.module.css";
import SmallFloorPlan from "./smallfloorplan";
import Axios from 'axios';
import SearchWidget from "./searchwidget";

const _ = require('lodash');

const Search = props => {
    const [allplans, setAllPlans] = useState([]);
    const [results, setResults ] = useState([]);
    const [whichcriteria, setWhichCriteria] = useState(true);
    const [showsearch, setShowSearch] = useState(false);
    const [criteria, setCriteria ] = useState({
            "specs.length": {
                name: "Length",
                type: "range",
                min: 20,
                max: 60
            },
            "specs.height": {
                name: "Width",
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

    
    
    const matchesSearch = (fiver) => {
        let filterkeys = Object.keys(criteria);
        for(let i=0; i<filterkeys.length; i++) {
            if(typeof(criteria[filterkeys[i]]) !== "undefined") {
                switch(criteria[filterkeys[i]].type) {
                    case "range":
                        let value = parseFloat(_.get(fiver, filterkeys[i]));
                        //console.log("Value is:" + value + ", Criteria Min is " + criteria[i].min + " and Max is " + criteria[i].max);
                        if( criteria[filterkeys[i]].min > value || value > criteria[filterkeys[i]].max) { return false };
                        break;
                }
            }
        }
        return true;
    }
    const filterSpecs = (fiver) => {
        if(Object.keys(criteria).length === 0 ) {
            return(fiver);
        }
        return(fiver);
    }
    return(
        <div className={styles.relativepos} onClick={() => setShowSearch(false)}>
            <SearchWidget criteria={criteria} setCriteria={setCriteria} showsearch={showsearch} setShowSearch={ setShowSearch } />
            <div>
                { results.length > 0 && results.map( (fiver) => {
                    return( 
                        <SmallFloorPlan specs={fiver}/>   
                    )})
                }
            </div>
            
        </div>
    );
}

export default Search;

/*
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

    <button type="button" name="changecriteria" onClick={changeCriteria}>Click to change criteria</button>

    */