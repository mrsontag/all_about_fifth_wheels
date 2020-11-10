import React from 'react';


const Select = props => {
    const { name, value = "", showtext, list = [], updateValue, showblank = true, keyname } = props
    return (
        <div>
            <label htmlFor={value}>{showtext}</label>
            <select name={name} value={value} onChange={(e) => updateValue(e)}>
                { showblank ? <option value=""></option> : "" }
                { list.length && list.map(item => {
                    let itemval = keyname ? item[keyname] : item;
                    return (
                        <option key={itemval} value={itemval}>{itemval}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select;