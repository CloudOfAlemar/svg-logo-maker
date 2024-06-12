
/*
  Require Modules
*/
const { Circle, Triangle, Square } = require( "./shapes" );

/*
  Get SVG Function
    1). get the appropriate svg according to the user svgShape property
        in the answers object
*/
const getSVG = function( answers ) {
  const { svgBgColor, svgText, svgTextColor } = answers;
  switch( answers.svgShape ) {
    case "Circle" : 
      const circle = new Circle();
      return circle.setColor( svgBgColor ).setText( svgText ).setTextColor( svgTextColor ).renderSVG();
    case "Triangle" : 
      const triangle = new Triangle();
      return triangle.setColor( svgBgColor ).setText( svgText ).setTextColor( svgTextColor ).renderSVG();
    case "Square" : 
      const square = new Square();
      return square.setColor( svgBgColor ).setText( svgText ).setTextColor( svgTextColor ).renderSVG();
  }
}

/*
  Export the function
*/
module.exports = getSVG;