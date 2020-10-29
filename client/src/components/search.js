import { StylesProvider } from '@material-ui/core';
import React, { useState } from 'react';
import CriteriaHamburger from "./criteriahamburger";
import styles from "./search.module.css";
import SmallFloorPlan from "./smallfloorplan";

const Search = props => {
    const [showsearch, setShowSearch ] = useState(false);

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
            <SmallFloorPlan imgsource="https://www.keystonerv.com/media/9154665/montana-high-country-295rl-2021.png"/> 
            <SmallFloorPlan imgsource="https://www.keystonerv.com/media/9154665/montana-high-country-295rl-2021.png"/> 
            <SmallFloorPlan imgsource="https://www.keystonerv.com/media/9154665/montana-high-country-295rl-2021.png"/> 
            <SmallFloorPlan imgsource="https://www.keystonerv.com/media/9154665/montana-high-country-295rl-2021.png"/> 
            <SmallFloorPlan imgsource="https://www.keystonerv.com/media/9154665/montana-high-country-295rl-2021.png"/> 
            <SmallFloorPlan imgsource="https://www.keystonerv.com/media/9154665/montana-high-country-295rl-2021.png"/> 
            <SmallFloorPlan imgsource="https://www.keystonerv.com/media/9154665/montana-high-country-295rl-2021.png"/> 
            <SmallFloorPlan imgsource="https://www.keystonerv.com/media/9154665/montana-high-country-295rl-2021.png"/>   
            </div>
        </div>
    );
}

export default Search;

