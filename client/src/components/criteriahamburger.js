import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CriteriaBar from './criteria_bar';

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
                    {children}
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
        minHeight: 224,
        width: 450
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 150
    },
}));


const CriteriaHamburger = props => {
    const { criteria, setCriteria } = props;
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={(e, newvalue) => { setValue(newvalue) }}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {/*<Tab label="Builders" {...a11yProps(0)} />*/}
                <Tab label="Specs" {...a11yProps(1)} />
                <Tab label="Tanks" {...a11yProps(2)} />
                <Tab label="Features" {...a11yProps(3)} />
            </Tabs>
            {/*}
            <TabPanel value={value} index={0}>
                <div>Manufacturers:</div>
                <div>Brands:</div>
                <div>Models:</div>
            </TabPanel>*/}
            <TabPanel value={value} index={0}>
                <CriteriaBar fieldname="Length: " criteriapath="specs.length" criteria={criteria} setCriteria={setCriteria} min={144} max={720} intoft={true}/>
                <CriteriaBar fieldname="Width: " criteriapath="specs.width" criteria={criteria} setCriteria={setCriteria} min={96} max={103} intoft={true} />
                <CriteriaBar fieldname="Height: " criteriapath="specs.height" criteria={criteria} setCriteria={setCriteria} min={144} max={160} intoft={true}/>
                <CriteriaBar fieldname="GVWR: " criteriapath="specs.weights.gvwr" criteria={criteria} setCriteria={setCriteria} min={7000} max={25000} infeet={false}/> 
            </TabPanel>
            <TabPanel  value={value} index={1}>
                <CriteriaBar fieldname="Fresh: " criteriapath="specs.tanks.fresh" criteria={criteria} setCriteria={setCriteria} min={0} max={150} intoft={false}/>
                <CriteriaBar fieldname="Grey: " criteriapath="specs.tanks.grey" criteria={criteria} setCriteria={setCriteria} min={0} max={150} intoft={false}/>
                <CriteriaBar fieldname="Black: " criteriapath="specs.tanks.black" criteria={criteria} setCriteria={setCriteria} min={0} max={150} intoft={false}/>
                <CriteriaBar fieldname="Propane: " criteriapath="specs.tanks.propane" criteria={criteria} setCriteria={setCriteria} min={0} max={150} intoft={false}/>
                
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CriteriaBar fieldname="Sleeps: " criteriapath="floorplan.sleeps" criteria={criteria} setCriteria={setCriteria} min={2} max={15} intoft={false}/>
            </TabPanel>

        </div>

    );

}

export default CriteriaHamburger;
