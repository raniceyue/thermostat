import React from 'react';
import './Border.css';
import { drawArc } from '../util/utils.js';

/**
 * Component for thermostat border
 */
const Border = () => {

    /**
     * d values for the arc SVGs
     */
    const arc1 = drawArc(50, 50, 43, -130, 130);
    const arc2 = drawArc(50, 50, 43, 130, 230);

    return(
        <>
        <div className="thermostat-border">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* BORDER */}
                <circle cx="50%" cy="50%" r="50" className="svg-thermo-outer-border"/>
                <circle cx="50%" cy="50%" r="47" className="svg-thermo-inner-border"/>
                
                {/* ARC AROUND FACE */}
                <defs>
                    <linearGradient id="myGradient" /*gradientTransform="rotate(90)"*/>
                        <stop className="svg-arc-cooling" offset="30%"/>
                        <stop className="svg-arc-heating" offset="70%"/>
                    </linearGradient>
                </defs>
                <path className="svg-arc" stroke="url('#myGradient')" d={arc1}/>
                <path className="svg-arc svg-arc-bottom" d={arc2}/>
            </svg>
        </div>
        </>
    );
}

export default Border;