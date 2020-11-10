import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import LinkedImage from "./linked_image";
import styles from "./floorplanform.module.css";
import Axios from "axios";
import ValueBar from "./value_bar";
import { useNavigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import Select from "./select.js";

const TextInput = props => {
    const { name, text, value, updateValue } = props;
    return (
        <div className="inlineblock smmarg">
            <label htmlFor={name}>{text}</label>
            <input className="leftmarg" type="text" name={name} value={value} onChange={(e) => updateValue(e)} />
        </div>
    )
}

const FloorPlanForm = props => {
    const [ data, setData ] = useState("");
    const [ options, setOptions] = useState([]);
    const [ brands, setBrands] = useState([]);

    let outputobject = {}; 
    const Navigate = useNavigate();
    
    const concatPaths = (incoming, path) => {
        if(Array.isArray(incoming)) {
            for(let i = 0; i < incoming.length; i++) {
                concatPaths(incoming[i], `${path}[${i}]`);
            }
            return;
        }
        if(typeof(incoming) === "object") {
            for (let key in incoming) {
                concatPaths(incoming[key], (path ? `${path}.` : "" ) + key )
            }
            return;
        }
        outputobject[path] = incoming;
    }

    useEffect(() => {
        Axios.get("http://localhost:8000/api/manufacturers/")
            .then(res =>setOptions(res.data))
            .catch(err => console.log(err));
        Axios.get("http://localhost:8000/api/fivers/" + props.id)
            .then(res => {
                concatPaths(res.data, "");
                setData(outputobject);
                updateBrandList(outputobject.manufacturer);
            }) 
            .catch(err => console.log(err));
        
    }, [])
    const submitForm = (event) => {
        event.preventDefault();
        for(let key in data) {
            console.log(key);
            _.set(outputobject, key, data[key]);
        }
        if(props.id) {
            Axios.put("http://localhost:8000/api/fivers/update/" + props.id,outputobject )
            .then(res => {
                Navigate("http://localhost:3000/floorplan/" + props.id)} )
            .catch(err => console.log(err));
            return;
        }
        Axios.post("http://localhost:8000/api/fivers/new", outputobject)
            .then(res => {
                console.log(res); 
                Navigate("http://localhost:3000/floorplan/" + res.data.id)})
            .catch(err => console.log(err));
    }

    const updateBrandList = (curman) => {
        let found = false;
        for(const [key, manufacturer] of options.entries()) {
            if(manufacturer.manufacturer === curman) {
                setBrands(manufacturer.brands);
                found = true;
                break;
            }
        }
        if(!found) setBrands([]);
    }
    const updateValue = (e) => {
        setData({...data, [e.target.name]: e.target.value})
        if(e.target.name === "manufacturer") updateBrandList(e.target.value);
    }

    const setSlider = (name, value) => {
        setData({...data, [name]: value})
    }

    return (
        <form onSubmit={submitForm} className="blurrywhite">
            {  /*left column*/ }
            
            <div className="halfcolumn">
                <div className="halfsection">
                    <Select  name="manufacturer"  value={data.manufacturer ?? ""} showtext="Manufacturer: "
                        list={options} keyname="manufacturer" updateValue={updateValue} showblank={true} />
                    <Select name="brand" value={data.brand ?? ""} showtext="Brand: "
                        list={brands} keyname="name" updateValue={updateValue} showblank={true} />
                    <TextInput name="model" value={data.model ?? ""} text="Model:" updateValue={updateValue} />
                    <TextInput  name="pagelink" value={data.pagelink ?? ""} text="Link to Model Page:" 
                        updateValue={updateValue} />
                    <a className="nodec" href={data.pagelink} target="_blank">
                        <Button type="button" size="small" variant="contained" color="primary" onClick="">Test</Button></a>
                    <TextInput name="floorplanimg" text="Image of Floor Plan:" value={data.floorplanimg ?? ""} 
                        updateValue={updateValue}/>
                    <LinkedImage imgid="tempimage" letmagnify={3} linkto={data.floorplanimg} src={data.floorplanimg} 
                        width="300" height="300" />
                    <TextInput name="threedtourlink" text="Three-D Tour Link:" value={data.threedtourlink ?? ""} 
                        updateValue={updateValue} />
                    <a className="nodec" href={data.threedtourlink} target="_blank">
                        <Button type="button" size="small" variant="contained" color="primary" onClick="">Test</Button></a>
                </div>
                <div className="halfsection">
                    <h5 className={styles.header5}>Weights and Capacities:</h5>
                    <ValueBar name="GVWR" value={data["specs.weights.gvwr"] ?? 12500} fieldname="GVWR:" setValue={(value) => setSlider("specs.weights.gvwr", value)} min={5000} max={25000} defvalue={12500} />
                    <ValueBar name="Hitch" value={data["specs.weights.hitch"] ?? 2500} fieldname="Hitch:" setValue={(value) => setSlider("specs.weights.hitch", value)} min={1000} max={6000} defvalue={2500} />
                </div>
                <div className="halfsection">
                    <h5 className={styles.header5}>Floorplan Features:</h5>
                    <ValueBar name="Sleeps" value={data["floorplan.sleeps"] ?? 4 } fieldname="Sleeps (max):" setValue={(value) => setSlider("floorplan.sleeps", value)} min={0} max={16} defvalue={4} />
                    
                </div>
                <Button type="button" variant="contained" color="primary" onClick={
                    () => props.id ? 
                    Navigate("http://localhost:3000/floorplan/" + props.id) : 
                    Navigate("http://localhost:3000/search/")
                }>Go Back</Button>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </div>

            {  /*right column*/ }
            <div className="halfcolumn">
                <div className="halfsection">
                    <h5 className={styles.header5}>Dimensions:</h5>
                    <ValueBar name="Length" intoft={true} value={data["specs.length"] ?? 60} fieldname="Length:" setValue={(value) => setSlider("specs.length", value)} min={144} max={720} defvalue={60} />
                    <ValueBar name="Width" intoft={true} value={data["specs.width"] ?? 60} fieldname="Width:" setValue={(value) => setSlider("specs.width", value)} min={90} max={110} defvalue={96} />
                    <ValueBar name="Height" intoft={true} value={data["specs.height"] ?? 60} fieldname="Height:" setValue={(value) => setSlider("specs.height", value)} min={100} max={168} defvalue={162} />
                    
                </div>
                
                <div className="halfsection">
                    <h5 className={styles.header5}>Tanks:</h5>
                    <ValueBar name="Fresh" value={data["specs.tanks.fresh"] ?? 50} fieldname="Fresh Water:" setValue={(value) => setSlider("specs.tanks.fresh", value)} min={0} max={150} defvalue={50} />
                    <ValueBar name="Grey" value={data["specs.tanks.grey"] ?? 50} fieldname="Grey Water:" setValue={(value) => setSlider("specs.tanks.grey", value)} min={0} max={150} defvalue={50} />
                    <ValueBar name="Black" value={data["specs.tanks.black"] ?? 50} fieldname="Black Water:" setValue={(value) => setSlider("specs.tanks.black", value)} min={0} max={150} defvalue={50} />
                    <ValueBar name="Propane" value={data["specs.tanks.propane"] ?? 60} fieldname="Propane:" setValue={(value) => setSlider("specs.tanks.propane", value)} min={0} max={150} defvalue={50} />
                </div>
            </div>
        </form>
    )
}

export default FloorPlanForm;


/*
<div>
                        <label htmlFor="manufacturer">Manufacturer:</label>
                        <select name="manufacturer" value={data.manufacturer ?? ""} onChange={(e) => updateValue(e)}>
                            <option value=""></option>
                            {  options.length && options.map(option => { 
                                return(
                                    <option value={option.manufacturer}>{option.manufacturer}</option>
                                )
                            })}
                        </select>
                    </div>
<div>
                        <label htmlFor="brand">Brand:</label>
                        <select name="brand" value={data.brand ?? ""} onChange={(e) => updateValue(e)}>
                            <option value=""></option>
                            { brands.length && brands.map(brand => {
                                return (
                                    <option value={brand.name}>{brand.name}</option>
                                )
                            })}
                        </select>

                    </div>
                    */