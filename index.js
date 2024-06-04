
const { promptSVGText, promptSVGTextColor, promptSVGShape, promptSVGBgColor } = require( "./lib/inquirerPrompts" );

promptSVGText()
  .then( answers => {
    return promptSVGTextColor( answers );
  } )
  .then( answers => {
    return promptSVGShape( answers );
  } )
  .then( answers => {
    return promptSVGBgColor( answers );
  } )
  .then( answers => {
    console.log( answers );
  } );
