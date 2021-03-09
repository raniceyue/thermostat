import React from 'react';
import './style.css';

/**
 * Component for testing controls, controls current temperature
 */
const CurrentTempController = ({minTc, maxTc, Tc, handleTcChange}) => {
    return(
        <div className="control-container">
            <div className="text-input-container">
                <label htmlFor="set-curr-temp">Set Current Temperature </label>
                <input 
                    type="number" 
                    id="set-curr-temp" 
                    value={Tc} 
                    onChange={e => handleTcChange(e.target.value)}/>
            </div>
            <input 
                type="range" 
                min={ minTc } 
                max={ maxTc } 
                value={ Tc } 
                onChange={e => handleTcChange(e.target.value)}/>
        </div>
    );
}

export default CurrentTempController;