import React from 'react';
import { inchesToFeet } from "./feetinches";
import _ from 'lodash';

const SpecsTable = props => {
    const { specs, showwhich } = props;
    
    const convert = ["Length", "Width", "Height"]
    

    return (
        <table>
            <tbody>
                {Object.keys(showwhich).map((key) => {
                    return (
                        <tr key={key}>
                            <td>{key}: </td>
                            <td>{ convert.includes(key) ? inchesToFeet(_.get(specs,showwhich[key])) : _.get(specs,showwhich[key])}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default SpecsTable;