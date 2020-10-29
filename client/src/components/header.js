import React from 'react';
//import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//import Typography from '@material-ui/core/Typography';
//import Box from '@material-ui/core/Box';
//import { Select } from '@material-ui/core';
import styles from "./header.module.css";


function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            //onClick={(event) => {
            //    event.preventDefault();
            //}}
            {...props}
        />
    );
}
/*
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
*/

const Header = props => {
    const [value, setValue] = React.useState(2);
    
    return (
        <div className={styles.header}>
            <h1>All About Fifth Wheels</h1>
            <a href="/myaccount">My Account</a>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={false}   
                    onChange={(e, newvalue) => setValue(newvalue)}
                    aria-label="nav tabs example"
                >
                    <LinkTab label="Floorplans" href="/search" {...a11yProps(0)} />
                    <LinkTab label="Resources" href="/resources" {...a11yProps(1)} />
                    <LinkTab label="News" href="/news" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            
        </div>
    );
}

export default Header;


/*


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

<TabPanel value={value} index={0}>
                Page One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Page Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Page Three
            </TabPanel>*/

            /*
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}*/