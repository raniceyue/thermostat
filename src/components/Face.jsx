import React, { useEffect, useState } from 'react';
import './style.css';

import TemperatureText from './TemperatureText.jsx';

/**
 * Component for thermostat face
 */

const Face = ({Tt, Tc, mode}) => {
	    
    const [heating, setHeating] = useState(0);
    const [cooling, setCooling] = useState(0);

    /**
     * Hook to handle transition between states
     */
    useEffect(() => {
        // Difference in temp, either 4.5 or 5
        let d = Tt - Tc;
        let o = 0;
        
        while (d >= 0 && o < 1) {
            o += 0.2;
            d -= 0.5;
        }

        let o_heat = o;
        let o_cool = o;

        if (mode === 'COOLING') {
            o_heat = o_heat * 0;
        }  
        
        if (mode === 'HEATING') {
            o_cool = o_cool * 0;
        } 

        setCooling(o_cool);
        setHeating(o_heat);

        console.log("HEATING OPACITY: " + cooling);
        console.log("COOLING OPACITY: " + heating);

    }, [Tc, Tt, mode]);

    return(
		<div className="thermostat-face">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle className='svg-thermo-face-idle' opacity='1' cx="50%" cy="50%" r="42"/>
                <circle className='svg-thermo-face-heating' opacity={ heating } cx="50%" cy="50%" r="42"/>
                <circle className='svg-thermo-face-cooling' opacity={ cooling } cx="50%" cy="50%" r="42"/>
                <TemperatureText Tt={Tt} Tc={Tc} />
            </svg>
        </div>
    );
}

export default Face;