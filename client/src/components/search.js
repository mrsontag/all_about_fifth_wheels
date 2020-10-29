//import { StylesProvider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CriteriaHamburger from "./criteriahamburger";
import styles from "./search.module.css";
import SmallFloorPlan from "./smallfloorplan";
import Axios from 'axios';

const Search = props => {
    const [showsearch, setShowSearch ] = useState(false);
    const [results, setResults ] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/fivers/")
            .then(res => { console.log(res); setResults(res.data) })
            .catch(err => console.log(err));
    },[])

    const SearchBlock = () => {
        if(showsearch) {
            return (
                <>
                <div className={styles.floatingburger} onClick={(e) => e.stopPropagation()}>
                    <CriteriaHamburger />
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

