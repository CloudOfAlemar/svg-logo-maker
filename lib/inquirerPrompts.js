const inquirer = require( "inquirer" );

let svgTextIsInvalid = false;
let svgTextColorIsInvalid = false;
let svgBgColorInvalid = false;

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

const promptColor = function( previousAnswers, message, isInvalid, recurringFunction, name ) {
  return new Promise( ( resolve, reject ) => {
    inquirer
      .prompt( [
        {
          type : "input",
          message : message,
          name : name
        }
      ] )
      .then( answers => {
        const regexLetters = /^[a-zA-Z]+$/;
        const regexHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if( !( regexLetters.test( answers[ name ] ) || regexHex.test( answers[ name ] ) ) ){
          if( !isInvalid ) {
            if (name === "svgTextColor") {
              svgTextColorIsInvalid = true;
            } else if (name === "svgBgColor") {
              svgBgColorInvalid = true;
            }
          }
          resolve( recurringFunction( previousAnswers ) );
        } else {
          answers.svgText = previousAnswers.svgText;
          previousAnswers[ name ] = answers[ name ];
          resolve( previousAnswers );
        }
      } )
      .catch( error => {
        reject( error );
      } );
  } );
}

const promptSVGTextColor = function( previousAnswers ) {
  const message =
    svgTextColorIsInvalid
    ? "Invalid color. Enter a text color ( All letters or hexadecimal value ):"
    : "Enter a text color ( All letters or hexadecimal value ):";

  return promptColor( previousAnswers, message, svgTextColorIsInvalid, promptSVGTextColor, "svgTextColor" );
}

const promptSVGShape = function( previousAnswers ) {
  return new Promise( ( resolve, reject ) => {
    inquirer
      .prompt( [
        {
          type : "list",
          message : "Select an SVG shape:",
          name : "svgShape",
          choices : [ "Circle", "Triangle", "Square" ]
        }
      ] )
      .then( answers => {
        previousAnswers.svgShape = answers.svgShape;
        resolve( previousAnswers );
      } )
      .catch( error => {
        reject( error );
      });
  } );
}

const promptSVGBgColor = function( previousAnswers ) {
  const message =
    svgBgColorInvalid
    ? "Invalid color. Enter a background color ( All letters or hexadecimal value ):"
    : "Enter a background color ( All letters or hexadecimal value ):";
  return promptColor( previousAnswers, message, svgBgColorInvalid, promptSVGBgColor, "svgBgColor" );
}

module.exports = {
  promptSVGText,
  promptSVGTextColor,
  promptSVGShape,
  promptSVGBgColor
}