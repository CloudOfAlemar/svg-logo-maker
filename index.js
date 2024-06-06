
const fs = require( "fs/promises" );
const { promptSVGText, promptSVGTextColor, promptSVGShape, promptSVGBgColor } = require( "./lib/inquirerPrompts" );
const getSVG = require( "./lib/getSVG" );

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
    const svgCode = getSVG( answers );
    return fs.writeFile( "examples/logo.svg", svgCode );
  } )
  .then( () => {
    console.log( "Generated logo.svg." );
  } );
