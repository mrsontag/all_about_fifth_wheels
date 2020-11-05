import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import LinkedImage from "./linked_image";
import styles from "./floorplanform.module.css";
import Axios from "axios";

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
                <div>
                    <label htmlFor="model">Model:</label>
                    <input type="text" name="model" value={data.model ?? ""} onChange={(e) => updateValue(e)} />
                </div>
                <div>
                    <label htmlFor="pagelink">Link to Manufacturer Page:</label>
                    <input type="text" name="pagelink" value={data.pagelink ?? ""} onChange={(e) => updateValue(e)} />
                </div>
                <div>
                    <label htmlFor="floorplanimg">Image of Floor Plan:</label>
                    <input type="text" name="floorplanimg" value={data.floorplanimg ?? ""} onChange={(e) => updateValue(e)} />
                </div>
                <a href={data.floorplanimg} target="_blank">
                    <LinkedImage src={data.floorplanimg} width="300" height="300" />
                </a>
                <div>
                    <label htmlFor="threedtourlink">Three-D Tour Link:</label>
                    <input type="text" name="threedtourlink" value={data.threedtourlink ?? ""} onChange={(e) => updateValue(e)} />
                </div>
                <a href={data.threedtourlink} target="_blank">Test Link for 3D Floorplan</a>
            </div>
            <div className={styles.columns}>
            
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
