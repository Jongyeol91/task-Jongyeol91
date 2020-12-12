import React, { useMemo } from "react";

const Dropdown = ({ level, unit, setValue }) => {
    const makeSelectTag = useMemo(() => {
        const options = [];
            for (let i = 0; i <= level; i++) {
                options.push(<option key={`key_${i}`} value={i}>{i + unit}</option>)
            }
            return options;
    }, [level, unit])

    const onChangeSelect = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <select name="arrivalTime" id="arrivalTime" onChange={onChangeSelect}>
                <option key={`key_start`} hidden>{unit}</option>
                {makeSelectTag}
            </select>
        </>
    )
}

export default Dropdown;