import React from 'react';
import CriteriaHamburger from "./criteriahamburger";
import styles from "./search.module.css";
import { inchesToFeet } from "./feetinches";


const SearchWidget = props => {
    const { criteria, setCriteria, showsearch, setShowSearch } = props;
    
    const criteriaString = (accumulator, key) => {
        if(typeof(criteria[key]) !== "undefined") {
            let currenttext;
            if(accumulator.length > 0 ) { accumulator = `${accumulator}, `}
            switch(criteria[key].type) {
                case "range":
                    criteria[key].intoft ?
                        currenttext = `${criteria[key].name}: ${inchesToFeet(criteria[key].min)}-${inchesToFeet(criteria[key].max)}` :
                        currenttext = `${criteria[key].name}: ${criteria[key].min}-${criteria[key].max}`
                    break;
                case "boolean":
                    criteria[key].intoft ?
                        currenttext = `${criteria[key].name}: ${inchesToFeet(criteria[key].value)}` : 
                        currenttext = `${criteria[key].name}: ${criteria[key].value}`;
                    break;
                default:
                    currenttext = `${criteria[key].name}`
                    

            }
            return ( `${accumulator}${currenttext}`)
        }
        return(accumulator);
    }
    const criteriaText = () => {
        let criteriatext = Object.keys(criteria).reduce(criteriaString,"");
        if(criteriatext.length === 0 ) {
            criteriatext = "None"
        }
        return(
            <>
                <strong>Criteria:</strong> {criteriatext}
            </>
        );
    }
    const SearchBlock = () => {
        if(showsearch) {
            return (
                <>
                <div className={styles.floatingburger} onClick={(e) => e.stopPropagation()}>
                    <CriteriaHamburger criteria={criteria} setCriteria={setCriteria}/>
                </div>
                </>
            )
        }
    }

    return (
        <>
        { SearchBlock() }
        <div className={styles.criteria_summary + " blurrywhite"} onClick={(e) => { e.stopPropagation(); setShowSearch(true)}}>{criteriaText()}</div>
        </>
    )
}

export default SearchWidget;