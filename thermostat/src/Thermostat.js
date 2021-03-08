import React, { useState } from 'react';
import './thermo.css';
import { describeArc } from './utils.js';

const Thermostat = () => {

	// Arc surrounding inner face settings
	const arc1 = describeArc(50, 50, 43, -150, 150).toString();
	const arc2 = describeArc(50, 50, 43, 150, 210).toString();
	const arc_stroke_width = 2.5;

	const [currTemp, setCurrTemp] = useState(72);
	const [thermoTemp, setThermoTemp] = useState(currTemp);

	const handleTextInputChange = (value) => {
		// Handle invalid ranges
		(value < 0 || value > 100) 
			? alert("Invalid temperature range! Valid range: 0 - 100") 
			: setCurrTemp(value);
		console.log(value);
	}

    return (
        <>
			<div class="thermostat">
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<circle cx="50%" cy="50%" r="50" className="svg-thermo-outer-border"/>
					<circle cx="50%" cy="50%" r="47" className="svg-thermo-inner-border"/>
					<defs>
						<linearGradient id="myGradient" /*gradientTransform="rotate(90)"*/>
							<stop offset="30%"  stopColor="#5495CA" />
							<stop offset="70%" stopColor="#EF6B6B" />
						</linearGradient>
					</defs>

					<path fill="transparent" stroke="#52525A" strokeWidth={arc_stroke_width} d={arc2}/>
					<path fill="transparent" stroke="url('#myGradient')" strokeWidth={arc_stroke_width} d={arc1}/>
					<circle cx="50%" cy="50%" r="42" fill="#656B73"/>
					<text x="50%" y="55%" className="thermo-temp-text">{ thermoTemp }</text>
					<text x="50%" y="65%" className="thermo-curr-temp-text">Current: { currTemp }</text>
				</svg>
			</div>

			<div className="control-container">
				<div className="text-input-container">
					<label htmlFor="set-curr-temp">Set Current Temperature </label>
					<input type="text" id="set-curr-temp" value={currTemp} onChange={e => handleTextInputChange(e.target.value)}/>
				</div>
				<input type="range" min="0" max="100" value={currTemp} onChange={e => handleTextInputChange(e.target.value)}/>
			</div>
        </>
    );
}

export default Thermostat;