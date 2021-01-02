import React, { useState } from 'react';
import styles from "./madeby.module.css";

const MadeBy = props => {

    return (
        <div className={styles.madeby} onClick={() => window.open("https://www.mrsontag.com", "_blank")}>
            <p>©2021 Matt Sontag</p>
        </div>
    )
}

export default MadeBy;