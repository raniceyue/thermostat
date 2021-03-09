import React, { useEffect, useState } from 'react';
import './style.css';

import TemperatureText from './TemperatureText.jsx';

/**
 * Component for thermostat face
 */

const Face = ({Tt, Tc, mode}) => {
	    
    const [animation, setAnimation] = useState('');
    const [heating, setHeating] = useState(0.0);
    const [cooling, setCooling] = useState(0.0);

    /**
     * Handle mode transition for face by changing class of SVG
     * @param {string} mode 
     */

    useEffect(() => {
        if (mode === 'COOLING') {
            console.log('Changing face to cooling...');
        } else if (mode === 'HEATING') {
            console.log('Changing face to heating...');
        } else {
            console.log('Changing face to idle...');
        }
    });

    return(
		<div className="thermostat-face">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle id="svg-thermo-face" className='animation-cooling' opacity='0.2' cx="50%" cy="50%" r="42"/>
                <TemperatureText Tt={Tt} Tc={Tc} />
            </svg>
        </div>
    );
}

export default Face;