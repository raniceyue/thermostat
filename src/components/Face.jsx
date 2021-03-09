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

                {/* SUN ICON */}
                <path className="svg-sun-icon"
                    d="M12, 9c1.65, 0, 3, 1.35, 3, 3s-1.35, 3-3, 3s-3-1.35-3-3 S10.35, 9, 12, 9 
                        M12, 7c-2.76, 0-5, 2.24-5, 5s2.24, 5, 5, 5s5-2.24, 5-5 S14.76, 7, 12, 7L12, 7z 
                        M2, 13l2, 0c0.55, 0, 1-0.45, 1-1s-0.45-1-1-1l-2, 0c-0.55, 0-1,0.45-1, 1S1.45,13,2, 13z 
                        M20, 13l2, 0c0.55, 0, 1-0.45, 1-1 s-0.45-1-1-1l-2, 0c-0.55, 0-1, 0.45-1, 1S19.45, 13, 20, 13z 
                        M11, 2v2c0, 0.55, 0.45, 1, 1, 1s1-0.45, 1-1V2c0-0.55-0.45-1-1-1S11, 1.45, 11, 2z 
                        M11, 20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45, 
                        19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,
                        0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03, 0-1.41L5.99,4.58z 
                        M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39, 1.03,0,
                        1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03, 0-1.41 
                        L18.36,16.95z 
                        M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,
                        0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z 
                        M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,
                        0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"
                />
            </svg>
        </div>
    );
}

export default Face;