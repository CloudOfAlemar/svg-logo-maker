
const { promptSVGText, promptSVGTextColor } = require( "./lib/inquirerPrompts" );

promptSVGText()
  .then( answers => {
    return promptSVGTextColor( answers );
  } )
  .then( answers => {
    console.log( answers );
  } );