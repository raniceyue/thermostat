# CS3249 Assignment 3 by Ranice

## Preview

// Insert gif of radial slider control here

// Insert gif of scroll function here

## Slider Implementation

### Click and drag interaction
For the click and drag

### Calculation of mouse movement
1. Calculating the bearing between the line drawn from the cursor to the origin of the thermostat
2. Conversion of bearing angle to thermostat value

#### Bearing Calculations

In order to calculate the bearings, I created an origin using an invisible `div` of size `1px` by `1px` that is positioned at the center of the thermostat.

For calculating the bearings, 
- Let `mx` = x-coordinates of cursor position on viewport
- Let `my` = y-coordinates of cursor position on viewport
- Let `cx` = x-coordinates of origin from left of viewport
- Let `cy` = y-coordinates of origin from top of viewport

Cursor coordinates are retrieved from the `MouseMove` event, while coordinates of the origin are retrieved by the method `getBoundingClientRect()` on the `div` element. 

It is important to note that `my` and `cy` are negative, as the coordinate system of the viewport takes the top left of the viewport to be the origin. 

The differences between the x and y coordinates of the origin and the coordinates of the cursor can be used to calculate the bearings of the mouse WRT the origin of the thermostat, as seen in the following diagram: 

![Slider math diagram](./documentation/slider-math-diagram.png)

> **References**
>
> - https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
> - https://math.stackexchange.com/questions/1596513/find-the-bearing-angle-between-two-points-in-a-2d-space

#### Bearing to Value

For the slider, the maximum drag both clockwise and anticlockwise is in the range [-150, 150], as it follows the markings on the thermostat.

![Slider degrees to value](./documentation/slider-deg-to-val.png)

At 0 degrees, the value of the target temperature is 65. 
At 150 degrees, the value of the target temperature is 80.

As such, for every 10 degrees, there will be a change in the target temperature by 1.

As the bearing is with respect to the positive y-axis, the value incremented must be with respect to the value at 0 degrees i.e. 65, therefore the mapping from bearing to value is 

```js
var value = 65 - Math.round(angle / 10);
```

### Scroll interaction
For the scrolling interaction, I create 2 custom events:
1. `scrollUp`: Case where the mouse wheel scrolls upwards
2. `scrollDown`: Case where the mouse wheel scrolls downwards

When the component renders, event listeners are added to the component to detect the custom events. 

When the `wheel` event is detected by the component, the 2 custom events are created and dispatched depending on the `deltaY` attribute of the `wheel` event. 

For `scrollUp`, target temperature is incremented by 1.
For `scrollDown`, target temperature is decremented by 1.

> **References**
> 
> https://developer.mozilla.org/en-US/docs/Web/API/Document/wheel_event

## File Structure

All files used to create this component are in `thermostat > src`.

**File Structure within `src`**

```
    src/
    |-- components/
    |-- util/
    |-- App.js
    |-- index.css
    |-- index.js
```

### `components`

This folder contains all `.jsx` files for the implementation of components used for this widget, as well as one general `style.css` file for syling for all the components.

Within this folder, there are 6 main components

#### 1. `Thermostat.jsx`

This file consists of all sub-components that make up the entire thermostat widget. It is responsible for managing the propagation to and communication of the **current temperature**, **target temperature** and **mode** to all sub-components. 

#### 2. `Border.jsx`

This sub-component represents the outer rings (border) of the thermostat, and consists of mostly SVG elements that make up the border of the thermostat.

// Insert image here

#### 3. `Face.jsx`

This sub-component represents the face of the thermostat, and manages changes to the colour of the face depending on the mode of the thermostat (heating, cooling, idle). 

#### 4. `TemperatureText.jsx`

This sub-component represents the text on the face of the thermostat, and is implemented using SVG. 

#### 5. `Slider.jsx`

This sub-component manages the slider and scrolling interactivity of the thermostat component. 

#### 6. `CurrentTempController.jsx`

This sub-component represents the manual controls for setting the current temperature. 

####

### `util`

This folder contains 

## References

- Constructing arcs in SVG
    -  https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
- File structure for React applications best practices
    -  https://reactjs.org/docs/faq-structure.html