const inquirer = require( "inquirer" );

// Will become true when user enters a text input that's greater than 3 characters or is blank
let isInvalid = false;

const promptSVGText = function() {

  // Displays appropriate message depending if isInvalid is true or false
  const message = 
    isInvalid 
    ? "Invalid Entry. Enter text for your SVG ( up to 3 characters long ):"
    : "Enter text for your SVG ( up to 3 characters long ):";
  
    return new Promise( ( resolve, reject ) => {
    inquirer
      .prompt( [ 
        {
          type : "input",
          message : message,
          name : "svgText"
        }
      ] )
      .then( answers => {
        if( answers.svgText.length > 3 || answers.svgText === "" ) {
          if( !isInvalid ) isInvalid = true;
          resolve( promptSVGText() );
        } else {
          resolve( answers );
        }
      } )
      .catch( error => {
        reject( error );
      } );
  } );
}

const promptSVGTextColor = function( svgTextAnswers ) {
  return new Promise( ( resolve, reject ) => {
    inquirer
      .prompt( [
        {
          type : "input",
          message : "Enter a text color:",
          name : "svgTextColor"
        }
      ] )
      .then( answers => {
        answers.svgText = svgTextAnswers.svgText;
        resolve( answers );
      } )
      .catch( error => {
        reject( error );
      } );
  } );
}

module.exports = {
  promptSVGText,
  promptSVGTextColor
}