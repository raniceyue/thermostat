import React, { useEffect, useState } from 'react';
import './thermo.css';
import { drawArc } from './utils.js';

const Slider = ({minT, maxT, Tt, handleTargetTempChange}) => {

    /**
     * When user's left mouse button down on the slider, start detecting for
     * - Mouse movement
     * - Event where mouse button up
     */
    const onMouseDown = (e) => {
        console.log("MOUSE DOWN: Adding event listeners for slider");
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    /**
     * When user's left mouse button is no longer down on slider, stop detecting for movement
     * - Mouse movement
     * - Event where mouse button up
     */
    const onMouseUp = (e) => {
        console.log("MOUSE UP: Removing event listeners for slider");
        document.removeEventListener("mousemove", onMouseMove);
    }

    /**
     * When mouse enters slider, detect scrolling on the slider 
     */
    const onMouseEnter = (e) => {
        console.log("MOUSE ENTER: Adding event listener for wheel");
        document.addEventListener("wheel", onScroll);
    }

    /**
     * When mouse leaves, remove event listener for wheel
     */
    const onMouseLeave = (e) => {
        console.log("MOUSE LEAVE: Removing event listener for wheel");
        document.removeEventListener("wheel", onScroll);
    }

    /**
     * Handlers for scrolling
     */
    const onScroll = (e) => {
        let slider = document.getElementsByClassName("slider")[0];
        // console.log(slider);
        let scrollUp = new CustomEvent("scrollUp");
        let scrollDown = new CustomEvent("scrollDown");
        if (e.deltaY < 0) {
            slider.dispatchEvent(scrollUp);
        } else {
            slider.dispatchEvent(scrollDown);
        }
    }

    const onScrollUp = (e) => {
        console.log("SCROLL UP");
        handleTargetTempChange(Tt + 1);
    }

    const onScrollDown = (e) => {
        console.log("SCROLL DOWN");
        handleTargetTempChange(Tt - 1);
    }

    /**
     * Handle slider
     */
    const onMouseMove = (e) => {
        console.log("Mouse is moving");
    }

    // Data for slider
    const [sliderData, setSliderData] = useState({
        minT: 30,
        maxT: 80,
        startAngle: 210,
        endAngle: 150,
    });

    
    // Same as componentDidUpdate and componentDidMount
    // https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        let slider = document.getElementsByClassName("slider")[0];
        console.log(slider);
        slider.addEventListener("scrollUp", onScrollUp);
        slider.addEventListener("scrollDown", onScrollDown);
        // Same as componentDidUnmount()
        return function removeEventListeners() {
            slider.removeEventListener("scrollUp", onScrollUp);
            slider.removeEventListener("scrollDown", onScrollDown);
        };
    }, [onScrollUp, onScrollDown]);


    return(
        <div className="slider"
            onMouseEnter={e => onMouseEnter(e)}
            onMouseLeave={e => onMouseLeave(e)}
            onMouseDown={e => onMouseDown(e)}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* <ellipse transform="rotate(0 0 10)" className="slider-mark" cx="50%" cy="14%" rx=".5" ry="4"/> */}
                <path className="slider-marks" d={drawArc(50, 50, 37, -150, 150)}/>
            </svg>
        </div>
    );
}

export default Slider;

