import React, { useState } from 'react';

import './thermo.css';
import Face from './Face.jsx';
import Slider from './Slider.jsx';

const Thermostat = () => {
	const minT = 50;
	const maxT = 80;

	const [Tc, setTc] = useState(72);	// Range: 32 - 100
	const [Tt, setTt] = useState(72);	// Range: 50 - 80


	const handleTextInputChange = (value) => {
		(value < minT || value > maxT) 
			? alert("Invalid temperature range! Valid range: " + minT + " to " + maxT)
			: setTc(value);
	}

	// Callback 
	const handleTargetTempChange = (value) => {
		if (value >= 30 && value <= 100) {
			setTt(value);
		}
	}

    return (
        <>
			<Face Tt={Tt} Tc={Tc}/>

			<Slider minT={minT} maxT={maxT} Tt={Tt} handleTargetTempChange={handleTargetTempChange}/>

			{/* USER CONTROLS */}
			<div className="control-container">
				<div className="text-input-container">
					<label htmlFor="set-curr-temp">Set Current Temperature </label>
					<input type="number" id="set-curr-temp" value={Tc} onChange={e => handleTextInputChange(e.target.value)}/>
				</div>
				<input type="range" min={ minT } max={ maxT } value={ Tc } onChange={e => handleTextInputChange(e.target.value)}/>
			</div>
        </>
    );
}

export default Thermostat;