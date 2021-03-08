import React from 'react';

const TemperatureText = ({Tt, Tc}) => {
    return(
        <>
        <text x="50%" y="55%" className="thermo-temp-text">{ Tt }</text>
        <text x="50%" y="65%" className="thermo-curr-temp-text">Current: { Tc }</text>        
        </>
    );
}

export default TemperatureText;