import React from 'react';


const SpecsTable = props => {
    const { specs } = props;
    return (
        <table>
            <tbody>
                {Object.keys(specs).map((key, index) => {
                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{specs[key]}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default SpecsTable;