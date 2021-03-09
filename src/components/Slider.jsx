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
     * When user's left mouse button is no longer down on slider, stop detecting for
     * - Mouse movement
     * - Event where mouse button up
     */
    const onMouseUp = (e) => {
        console.log("MOUSE UP: Removing event listeners for slider");
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    /**
     * Handlers for scrolling
     */
    const onScroll = (e) => {
        let slider = document.getElementsByClassName("slider")[0];

        let scrollUp = new CustomEvent("scrollUp");
        let scrollDown = new CustomEvent("scrollDown");
        
        if (e.deltaY < 0) {
            slider.dispatchEvent(scrollUp);
        } else {
            slider.dispatchEvent(scrollDown);
        }
    }

    /**
     * Handle mouse down + mouse move events
     * 
     * Uses trigonometry to calculate the bearing of the cursor WRT thermostat
     * 
     * References
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
     * https://math.stackexchange.com/questions/1596513/find-the-bearing-angle-between-two-points-in-a-2d-space
     */
    const onMouseMove = (e) => {
        console.log("Mouse is moving");
        var cx = document.querySelector('.origin').getBoundingClientRect().left // Distance from left of origin to left of viewport
        var cy = document.querySelector('.origin').getBoundingClientRect().top; // Distance from top of origin to top of viewport

        var mx = e.pageX;   // x-coordinate of mouse
        var my = e.pageY;   // y-coordinate of mouse

        var angle = Math.atan2(mx - cx, -(my - cy)) * (180 / Math.PI); // Bearing of cursor
        var value = Math.round(65 + Math.round(angle / 10));
        console.log("ANGLE: " + Math.round(angle) + "\n VALUE: " + value);

        handleTtChange(value);
    }

    /**
     * Same as componentDidUpdate and componentDidMount
     * Event listeners for custom events added when component mounts
     * When component unmounts, event listeners are removed
     * 
     * Reference
     * https://reactjs.org/docs/hooks-effect.html
     */
    useEffect(() => {
        const onScrollUp = (e) => {
            handleTtChange(Tt + 1);
        }
    
        const onScrollDown = (e) => {
            handleTtChange(Tt - 1);
        }

        let slider = document.getElementsByClassName("slider")[0];
        slider.addEventListener("scrollUp", onScrollUp);
        slider.addEventListener("scrollDown", onScrollDown);
        
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

