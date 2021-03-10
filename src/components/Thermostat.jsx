import React, { useCallback, useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';

import './style.css';
import { ThermostatStates } from '../util/ThermostatStates.js';
import ThermostatController from '../util/ThermostatController.js';
import Border from './Border.jsx';
import Face from './Face.jsx';
import Slider from './Slider.jsx';
import CurrentTempController from './CurrentTempController';

/**
 * Main thermostat component containing all sub-components that make up the thermostat
 * The states Tt and Tc are the main sources of truth for the target and current temperature
 * Any changes in the values of Tt and Tc created by other components call the 
 * handleTtChange and handleTcChange functions which will modify the states
 * 
 * Based on the change in Tt/Tc, status of the thermostat is checked using the ThermostatController
 * object (business logic of thermostat), and based on the status received, will send a message to
 * the service (state machine) which will change the state of the thermostat accordingly
 */
const Thermostat = () => {
	/**
	 * Test variables
	 */
	const minTt = 50;
	const maxTt = 80;

	const minTc = 32;
	const maxTc = 100;

	const dT = 2;
	const dTcool = 1.5;
	const dTheat = 1;

	/**
	 * Component state
	 */
	const [Tt, setTt] = useState(72);	// Range: 50 - 80
	const [Tc, setTc] = useState(72);	// Range: 32 - 100
	const [current, send] = useMachine(ThermostatStates);

	let controller = new ThermostatController(dT, dTcool, dTheat);	// Object with all the business logic

	/**
	 * Callback functions passed to sub-components to handle temp changes 
	 * Used in sub-component CurrentTempController (for changing Tc, current temperature)
	 * Used in sub-component Slider (for changing Tt, target temperature)
	 */
	const handleTcChange = (value) => {
		if (value >= minTc && value <= maxTc) {
			setTc(value);
		}
	}

	const handleTtChange = (value) => {
		if (value >= minTt && value <= maxTt) {
			setTt(value);
			console.log('Tt received by slider: ' + value + '\nNew Tt value: ' + Tt);
		}
	}

	/**
	 * Function for regulating temperature
	 * State change according to status received by the business logic object
	 */
	const regulateTemp = useCallback(() => {
		var msg = controller.getStatus(current.value, Tc, Tt);
		if (msg !== 'MAINTAIN') send(msg); 
	});

	/**
	 * Whenever Tt or Tc changes, call regulateTemp()
	 */
	useEffect(() => { regulateTemp(); }, [Tt, Tc, regulateTemp]);

    return (
        <div className="container">
			<Border/>

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