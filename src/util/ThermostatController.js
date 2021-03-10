/**
 * Util class for controlling thermostat temperature
 * Based on example scenario
 */

class ThermostatController {

    constructor(dT, dTcool, dTheat) {
        this.dT = dT;
        this.dTcool = dTcool;
        this.dTheat = dTheat;
    }

    /**
     * Function to get status of thermostat based on temperature changes
     */
    getStatus(mode, Tc, Tt) {
        var status;
        switch(mode) {
            case 'COOLING':
                status = this.cooling(Tc, Tt);
                break;
            case 'HEATING':
                status = this.heating(Tc, Tt);
                break;
            case 'IDLE':
                status = this.idle(Tc, Tt);
                break;
            default:
        }
        return status;
    }


    /**
     * In the IDLE state
     *  2. Temperature rises and gets too hot with Tc = Tt + this.dT + this.dTcool
     *  7. Temperature drops until too cold, i.e. Tc = Tt - this.dT - this.dTheat
     */
    idle(Tc, Tt) {
        var Th = Tt + this.dT + this.dTcool;   // Upper bound
        var Tl = Tt - this.dT - this.dTheat;   // Lower bound
        if (Tc > Th) {
            return "TEMP_TOO_HOT";
        }

        if (Tc < Tl) {
            return "TEMP_TOO_COLD";
        }

        if (Tc >= Tl && Tc <= Th) {   // In the middle of upper and lower bound
            return "MAINTAIN";
        }
    }

    /**
     * In the COOLING state
     *  3. Temperature drops until a little too cold i.e. Tc = Tt - this.dT
     */
    cooling(Tc, Tt) {
        var TStop = Tt + (this.dT - this.dTcool);

        if (Tc < TStop) {   // Little too cold
            return "TEMP_OK";
        } else {
            return "MAINTAIN";
        }
    }

    /**
     * In the HEATING state
     *  9. Temperature rises until a little too hot, i.e. Tc = Tt + this.dT
     */
    heating(Tc, Tt) {
        var TStop = Tt - this.dT - this.dTheat;

        if (Tc > TStop) {   // Little too hot
            return "TEMP_OK";
        } else {
            return "MAINTAIN";
        }
    }
}

export default ThermostatController;
