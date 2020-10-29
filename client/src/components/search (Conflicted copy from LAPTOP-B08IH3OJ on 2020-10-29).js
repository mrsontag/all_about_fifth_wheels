//import { StylesProvider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CriteriaHamburger from "./criteriahamburger";
import styles from "./search.module.css";
import SmallFloorPlan from "./smallfloorplan";
import Axios from 'axios';

const _ = require('lodash');

const Search = props => {
    const [showsearch, setShowSearch ] = useState(false);
    const [allplans, setAllPlans] = useState([]);
    const [results, setResults ] = useState([]);
    const [criteria, setCriteria ] = useState(
        [
            {
                path: "specs.length",
                type: "range",
                min: 37,
                max: 45
            },
            {
                path: "specs.height",
                type: "range",
                min: 13.2,
                max: 15
            }
        ]
        );

    useEffect(() => {
        Axios.get("http://localhost:8000/api/fivers/")
            .then(res => { console.log(res); setAllPlans(res.data); setResults(res.data) })
            .catch(err => console.log(err));
    },[])

    useEffect(() => {
        setResults(allplans.filter(matchesSearch));
    }, [criteria]);

    const matchesSearch = (fiver) => {
        for(let i=0; i<criteria.length; i++) {
            switch(criteria[i].type) {
                case "range":
                    let value = parseFloat(_.get(fiver, criteria[i].path));
                    console.log("Value is:" + value);
                    return( criteria[i].min <= value && value <= criteria[i].max);
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
        </div>
    );
}

export default Search;

