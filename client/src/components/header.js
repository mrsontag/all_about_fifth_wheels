import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from "./header.module.css";

const Header = props => {
    //const [value, setValue] = React.useState(2);
    
    return (
        <div className={styles.header}>
            <h1>All About Fifth Wheels</h1>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={false}
                >
                    <Tab component="a" label="Floorplans" href="/search" />
                    <Tab component="a" label="Resources" href="/resources" />
                    <Tab component="a" label="News" href="/news" />
                </Tabs>
            </AppBar>
            
        </div>
    );
}

export default Header;