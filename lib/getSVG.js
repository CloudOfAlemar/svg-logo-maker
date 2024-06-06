const { Circle, Triangle, Square } = require( "./shapes" );

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

module.exports = getSVG;