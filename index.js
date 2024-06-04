
const { promptSVGText } = require( "./lib/inquirerPrompts" );

promptSVGText()
  .then( answer => {
    console.log( answer );
  } );