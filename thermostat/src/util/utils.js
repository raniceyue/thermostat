/**
 * File for all helper functions
 */

// Helper function to convert polar co-ordinates to cartesian co-ordinates
function polarToCartesian(centerX, centerY, radius, degrees) {
    var radians = (degrees - 90) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(radians)),
      y: centerY + (radius * Math.sin(radians))
    };
}

// Helper function for creating d attribute for path for circle arcs 
// Reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
export function drawArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [ "M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y ].join(" ");

	// debug console.log(d);
    return d;       
}