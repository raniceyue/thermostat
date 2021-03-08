import { Machine } from 'xstate';

export const ThermostatStates = Machine({
    id: 'mode',
    initial: 'IDLE',
    states: {
      IDLE: {
        on: {
          TEMP_TOO_HIGH: 'COOLING',
          TEMP_TOO_LOW: 'HEATING'
        }
      },
      COOLING: {
        on: {
          TEMP_OK: 'IDLE'
        }
      },
      HEATING: {
        on: {
          TEMP_OK: 'IDLE'
        }
      }
    }
});