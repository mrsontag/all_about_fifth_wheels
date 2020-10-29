import React from 'react';


const SpecsTable = props => {
    const { specs } = props;
    console.log("Specs are:");
    console.log(specs);

    const showwhich = {
        "Length": "Length",
        "Width": "Width",
        "Height": "Height",
        "Weight": "Weight"
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