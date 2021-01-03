//import { StylesProvider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styles from "./search.module.css";
import SmallFloorPlan from "./smallfloorplan";
import Axios from 'axios';
import SearchWidget from "./searchwidget";


const Search = props => {
    const [allplans, setAllPlans] = useState([]);
    const [results, setResults ] = useState([]);
    const [showwhich, setShowWhich] = useState(true);
    const [showsearch, setShowSearch] = useState(false);
    const _ = require('lodash');

    const [criteria, setCriteria ] = useState({
            "specs.length": {
                name: "Length",
                type: "range",
                intoft: true,
                min: 144,
                max: 720
            },
            "specs.height": {
                name: "Height",
                type: "range",
                intoft: true,
                min: 144,
                max: 160
            }
        });

    useEffect(() => {
        Axios.get("http://localhost:8001/api/fivers/")
            .then(res => { setAllPlans(res.data); setResults(res.data) })
            .catch(err => console.log(err));
    },[])

    useEffect(() => {
        setResults(allplans.filter(matchesSearch));
        setShowWhich(() => {
            let tempobj = {};
            for(let key in totallist) {
                if(typeof(criteria[totallist[key]]) !=="undefined") {
                    tempobj[key] = totallist[key]
                }
            }
            return tempobj;
        })
    }, [criteria]);

    const totallist = {
        "Length": "specs.length",
        "Width": "specs.width",
        "Height": "specs.height",
        "GVWR": "specs.weights.gvwr",
        "Fresh Water": "specs.tanks.fresh",
        "Grey Water": "specs.tanks.grey",
        "Black Water": "specs.tanks.black",
        "Propane": "specs.tanks.propane",
        "Sleeps": "floorplan.sleeps",
    }
    
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
                    default:
                }
            }
        }
        return true;
    }
    /*const filterSpecs = (fiver) => {
        if(Object.keys(criteria).length === 0 ) {
            return(fiver);
        }
        return(fiver);
    }*/
    return(
        <div className={styles.relativepos} onClick={() => setShowSearch(false)}>
            <SearchWidget criteria={criteria} setCriteria={setCriteria} showsearch={showsearch} setShowSearch={ setShowSearch } />
            <div>
                { results.length > 0 && results.map( (fiver) => {
                    return( 
                        <SmallFloorPlan key={fiver._id} specs={fiver} showwhich={showwhich}/>   
                    )})
                }
            </div>
            
        </div>
    );
}

export default Search;