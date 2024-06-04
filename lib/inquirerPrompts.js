const inquirer = require( "inquirer" );

let svgTextIsInvalid = false;
let svgTextColorIsInvalid = false;

const promptSVGText = function() {

  const message = 
    svgTextIsInvalid 
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
          if( !svgTextIsInvalid ) svgTextIsInvalid = true;
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
  const message =
    svgTextColorIsInvalid
    ? "Invalid color. Enter a text color ( All letters or hexadecimal value ):"
    : "Enter a text color ( All letters or hexadecimal value ):";

  return new Promise( ( resolve, reject ) => {
    inquirer
      .prompt( [
        {
          type : "input",
          message : message,
          name : "svgTextColor"
        }
      ] )
      .then( answers => {
        const regexLetters = /^[a-zA-Z]+$/;
        const regexHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if( !( regexLetters.test( answers.svgTextColor ) || regexHex.test( answers.svgTextColor ) ) ){
          svgTextColorIsInvalid = true;
          resolve( promptSVGTextColor( svgTextAnswers ) );
        } else {
          answers.svgText = svgTextAnswers.svgText;
          resolve( answers );
        }
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