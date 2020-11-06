import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import LinkedImage from "./linked_image";
import styles from "./floorplanform.module.css";
import Axios from "axios";
import ValueBar from "./value_bar";

const TextInput = props => {
    const { name, text, value, updateValue } = props;
    return (
        <div>
            <label htmlFor={name}>{text}</label>
            <input type="text" name={name} value={value} onChange={(e) => updateValue(e)} />
        </div>
    )
}

const FloorPlanForm = props => {
    const [ data, setData ] = useState("");
    const [ options, setOptions] = useState([]);
    const [ brands, setBrands] = useState([]);

    let outputobject = {}; 

    useEffect(() => {
        Axios.get("http://localhost:8000/api/manufacturers/")
            .then(res => setOptions(res.data))
            .catch(err => console.log(err));
    }, [])
    const submitForm = (event) => {
        event.preventDefault();
        for(let key in data) {
            console.log(key);
            _.set(outputobject, key, data[key]);
        }
        console.log(outputobject);
    }

    const updateValue = (e) => {
        setData({...data, [e.target.name]: e.target.value})
        if(e.target.name === "manufacturer") {
            let found = false;
            for(const [key, manufacturer] of options.entries()) {
                if(manufacturer.manufacturer === e.target.value) {
                    setBrands(manufacturer.brands);
                    found = true;
                    break;
                }
            }
            if(!found) { setBrands([])}
        }
    }

    const setSlider = (name, value) => {
        setData({...data, [name]: value})
    }
    
    return (
        <form onSubmit={submitForm} className="blurrywhite">
            <div className={styles.columns}>
                <div>
                    <label htmlFor="manufacturer">Manufacturer:</label>
                    <select name="manufacturer" value={data.manufacturer ?? ""} onChange={(e) => updateValue(e)}>
                        <option value="" selected></option>
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
                        { brands.length && brands.map(brand => {
                            return (
                                <option value={brand.name}>{brand.name}</option>
                            )
                        })}
                    </select>

                </div>
                <TextInput name="model" value={data.model ?? ""} text="Model:" updateValue={updateValue} />
                <TextInput  name="pagelink" value={data.pagelink ?? ""} text="Link to Manufacturer Page:" updateValue={updateValue} />
                <TextInput name="floorplanimg" text="Image of Floor Plan:" value={data.floorplanimg ?? ""} updateValue={updateValue}/>
                <LinkedImage linkto={data.floorplanimg} src={data.floorplanimg} width="300" height="300" />
                <TextInput name="threedtourlink" text="Three-D Tour Link:" value={data.threedtourlink ?? ""} updateValue={updateValue} />
                <a href={"https://" + data.threedtourlink} target="_blank">Test Link for 3D Floorplan</a>
            </div>
            <div className={styles.columns}>
                <ValueBar name="Length" value={data["specs.length"] ?? 60} fieldname="Length:" setValue={(value) => setSlider("specs.length", value)} min={25} max={60} defvalue={60} />
                <div>
                    <label htmlFor="Length">Length:</label>
                    <input type="text" name="specs.length" value={data["specs.length"] ?? ""} onChange={(e) => updateValue(e)} />
                </div>
                <div>
                    <label htmlFor="width">Width:</label>
                    <input type="text" name="specs.width" value={data["specs.width"] ?? ""} onChange={(e) => updateValue(e)} />
                </div>
                <div>
                    <label htmlFor="height">Height:</label>
                    <input type="text" name="specs.height" value={data["specs.height"] ?? ""} onChange={(e) => updateValue(e)} />
                </div>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default FloorPlanForm;
