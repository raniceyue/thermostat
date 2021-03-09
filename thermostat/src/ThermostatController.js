/**
 * Util file for controlling thermostat temperature
 * Based on example scenario
 */

const dT = 2;
const dTcool = 1.5;
const dTheat = 1;

/**
 * In the IDLE state
 *  2. Temperature rises and gets too hot with Tc = Tt + dT + dTcool
 *  7. Temperature drops until too cold, i.e. Tc = Tt - dT - dTheat
 */
export function idle(Tc, Tt) {
    var Th = Tt + dT + dTcool;   // Upper bound
    var Tl = Tt - dT - dTheat;   // Lower bound
    if (Tc > Th) {
        return "TEMP_TOO_HIGH";
    }

    if (Tc < Tl) {
        return "TEMP_TOO_LOW";
    }

    if (Tc >= Tl && Tc <= Th) {   // In the middle of upper and lower bound
        return "MAINTAIN";
    }
}

/**
 * In the COOLING state
 *  3. Temperature drops until a little too cold i.e. Tc = Tt - dT
 */
export function cooling(Tc, Tt) {
    var TStop = Tt + (dT - dTcool);

    if (Tc < TStop) {   // Little too cold
        return "TEMP_OK";
    } else {
        return "MAINTAIN";
    }
}

/**
 * In the HEATING state
 *  9. Temperature rises until a little too hot, i.e. Tc = Tt + dT
 */
export function heating(Tc, Tt) {
    var TStop = Tt - dT - dTheat;

    if (Tc > TStop) {   // Little too hot
        return "TEMP_OK";
    } else {
        return "MAINTAIN";
    }
}
