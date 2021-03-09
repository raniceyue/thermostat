# CS3249 Assignment 3 by Ranice

## Preview

// Insert gif of radial slider control here

// Insert gif of scroll function here

## File Structure

All files used to create this component are in `thermostat > src`.

**File Structure within `src`**

```
    src
    |-- components
    |-- util
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