import React from 'react';
import './CurrentTempController.css';

/**
 * Component for testing controls, controls current temperature
 */
const CurrentTempController = ({minTc, maxTc, Tc, handleTcChange}) => {
    return(
        <>
            <label htmlFor="tc-input-text">Set Current Temperature </label>
            <input 
                type="number" 
                id="tc-input-text" 
                value={Tc} 
                onChange={e => handleTcChange(e.target.value)}/>
            <input 
                type="range" 
                id="tc-input-range"
                min={ minTc } 
                max={ maxTc } 
                value={ Tc } 
                onChange={e => handleTcChange(e.target.value)}/>
        </>
    );
}

export default CurrentTempController;