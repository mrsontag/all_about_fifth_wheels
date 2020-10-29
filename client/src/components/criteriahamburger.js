import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CriteriaBar from "./criteria_bar";

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
        width: 400
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 150
    },
}));


const CriteriaHamburger = props => {
    const { criteria, setCritiera, filter, setFilter } = props;
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const [ length, setLength ] = useState([24,60]);
    const [ width, setWidth ] = useState([96,103]);
    const [ height, setHeight ] = useState([144,160]);

    const UpdateValue = (key, value) => {

    }
    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={(e, newvalue) => { setValue(newvalue) }}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Builders" {...a11yProps(0)} />
                <Tab label="Specs" {...a11yProps(1)} />
                <Tab label="Floorplans" {...a11yProps(2)} />
                <Tab label="Features" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <p>Manufacturers:</p>
                <p>Brands:</p>
                <p>Models:</p>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CriteriaBar fieldname="Length: " value={length} min={24} max={60} setvalue={ setLength } />
                <CriteriaBar fieldname="Width: " value={width} min={96} max={103} setvalue={ setWidth } />
                <CriteriaBar fieldname="Height: " value={height} min={144} max={160} setvalue={ setHeight } />
                
            </TabPanel>
            <TabPanel  value={value} index={2}>
                Floorplans
            </TabPanel>
            <TabPanel value={value} index={3}>
                Features
            </TabPanel>

        </div>

    );

}

export default CriteriaHamburger;
