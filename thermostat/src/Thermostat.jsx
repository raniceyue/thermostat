import React, { useState } from 'react';

import './style.css';
import { ThermostatStates } from './ThermostatStates.js';
import { idle, cooling, heating } from './ThermostatController.js';
import Face from './Face.jsx';
import Slider from './Slider.jsx';
import { useMachine } from '@xstate/react';
import CurrentTempController from './CurrentTempController';

const Thermostat = () => {
	const minTt = 50;
	const maxTt = 80;

	const minTc = 32;
	const maxTc = 100;

	const [Tt, setTt] = useState(72);	// Range: 50 - 80
	const [Tc, setTc] = useState(72);	// Range: 32 - 100
	const [current, send] = useMachine(ThermostatStates);

	/**
	 * Functions to handle temp changes from other components
	 * After setting temp will check temp and set mode of thermostat
	 */
	const handleTcChange = (value) => {
		if (value >= minTc && value <= maxTc) {
			setTc(value);
			regulateTemp();
		}
	}

	const handleTtChange = (value) => {
		if (value >= minTt && value <= maxTt) {
			setTt(value);
			regulateTemp();
		}
	}

	/**
	 * Function for regulating temperature
	 */
	const regulateTemp = () => {
		var msg;

		/**
		 * Get status from ThermostatController
		 */
		switch(current.value) {
			case 'COOLING':
				msg = cooling(Tc, Tt);
				break;
			case 'HEATING':
				msg = heating(Tc, Tt);
				break;
			case 'IDLE':
				msg = idle(Tc, Tt);
				break;
			default:
		}

		console.log('MESSAGE: ' + msg);

		/**
		 * State change according to status
		 */
		switch(msg) {
			case 'TEMP_TOO_HOT':
				console.log('OUTSIDE TOO HOT');
				send(msg);
				break;
			case 'TEMP_TOO_COLD':
				console.log('OUTSIDE TOO COLD');
				send(msg);
				break;
			case 'STOP':
				console.log('OUTSIDE IS NICE!!');
				send('IDLE');
				break;
			case 'MAINTAIN':
			default:
		}
	}

    return (
        <div class="container">
			<Face 
				Tt={Tt} 
				Tc={Tc}
				mode={current.value}
			/>

			<Slider 
				Tt={Tt} 
				handleTtChange={handleTtChange}
			/>

			<CurrentTempController 
				minTc={minTc}
				maxTc={maxTc}
				Tc={Tc}
				handleTcChange={handleTcChange}
			/>
        </div>
    );
}

export default Thermostat;