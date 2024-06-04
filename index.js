
const { promptSVGText, promptSVGTextColor, promptSVGShape } = require( "./lib/inquirerPrompts" );

promptSVGText()
  .then( answers => {
    return promptSVGTextColor( answers );
  } )
  .then( answers => {
    return promptSVGShape( answers );
  } )
  .then( answers => {
    console.log( answers );
  } );

