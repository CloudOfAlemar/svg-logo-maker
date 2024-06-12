
/*
  Require Modules
*/
const fs = require( "fs/promises" );
const { promptSVGText, promptSVGTextColor, promptSVGShape, promptSVGBgColor } = require( "./lib/inquirerPrompts" );
const getSVG = require( "./lib/getSVG" );

/*
  Get User Info
    1). Prompt for the SVG Text
    2). Followed by prompting for the SVG Text Color
    3). Then prompt for a shape
    4). Prompt for SVG Background Color
    5). Get the SVG code and create the logo.svg file
        using fs.writeFile
    6). Finally, console.log "Generated logo.svg"
*/
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
