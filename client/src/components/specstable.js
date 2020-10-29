import React from 'react';


const SpecsTable = props => {
    const { specs } = props;
    
    const showwhich = {
        "Length": "length",
        "Width": "width",
        "Height": "height",
        "Weight": "weight"
    }

    return (
        <table>
            <tbody>
                {Object.keys(showwhich).map((key) => {
                    return (
                        <tr key={key}>
                            <td>{key}: </td>
                            <td>{specs[showwhich[key]]}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default SpecsTable;