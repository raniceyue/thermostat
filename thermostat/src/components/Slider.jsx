import React, { useEffect } from 'react';
import './style.css';
import { drawArc } from '../util/utils.js';

const Slider = ({Tt, handleTtChange}) => {

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

    /**
     * Handle slider
     */
    const onMouseMove = (e) => {
        console.log("Mouse is moving");
    }

    // Same as componentDidUpdate and componentDidMount
    // https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        const onScrollUp = (e) => {
            console.log("SCROLL UP");
            handleTtChange(Tt + 1);
        }
    
        const onScrollDown = (e) => {
            console.log("SCROLL DOWN");
            handleTtChange(Tt - 1);
        }

        let slider = document.getElementsByClassName("slider")[0];
        slider.addEventListener("scrollUp", onScrollUp);
        slider.addEventListener("scrollDown", onScrollDown);
        // Same as componentDidUnmount()
        return function removeEventListeners() {
            slider.removeEventListener("scrollUp", onScrollUp);
            slider.removeEventListener("scrollDown", onScrollDown);
        };
    }, [handleTtChange, Tt]);

    return(
        <div className="slider"
            onMouseDown={e => onMouseDown(e)}
            onWheel={e => onScroll(e)}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* <ellipse transform="rotate(0 0 10)" className="slider-mark" cx="50%" cy="14%" rx=".5" ry="4"/> */}
                <path className="slider-marks" d={drawArc(50, 50, 37, -150, 150)}/>
            </svg>
        </div>
    );
}

export default Slider;

