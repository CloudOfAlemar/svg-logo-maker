
/*
  Require Modules
*/
const inquirer = require( "inquirer" );

/*
  Initiate Global Variables
*/
let svgTextIsInvalid = false;
let svgTextColorIsInvalid = false;
let svgBgColorInvalid = false;


/*
  Prompt SVG Text Function
    1). Set message variable according to the value of svgTextIsInvalid
    2). promptSVGText will be recursively called until the if conditions
        are not true
    3). Catch will catch any errors
    4). The function will return resolved ( answers ) or rejected ( error ) promise
        in order to not break the promise chain
*/
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

/*
  Prompt Color Function
    1). This function takes in some parameters:
      - the answers object being passed for each inquire prompt
      - the correct prompt message according to the global variable value
      - the corresponding global variable's initial false value
      - the recursive function is the function that is function will be
        called in
      - the key value name that will be in the inquirer answers object
    2). Set up Regular Expressions to allow certain patterns as answers:
      - regexLetters makes sure that the input only uses capital and
        lowercase letters
      - regexHex makes sure that the input is a hex pattern '#ffffff or #fff'
    3). If statements check a condition to change the global variable accordingly
      - either resolve the recurring function
      - or resolve the previous answers variable
*/
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

/*
  Prompt SVG TEXT Color
    1). Set the message variable according to svgTextColorIsInvalid global value
    2). return the promptColor function to recursively prompt for a color
*/
const promptSVGTextColor = function( previousAnswers ) {
  const message =
    svgTextColorIsInvalid
    ? "Invalid color. Enter a text color ( All letters or hexadecimal value ):"
    : "Enter a text color ( All letters or hexadecimal value ):";

  return promptColor( previousAnswers, message, svgTextColorIsInvalid, promptSVGTextColor, "svgTextColor" );
}

/*
  Prompt SVG Shape
    1). Takes in inquirer answers obj as a parameter
    2). Inquirer will prompt for a list of shapes:
      - Circle, Triangle and Square
    3). Set the svgShape property to answers and resolve previous answers
*/
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

/*
  Prompt SVG Background Color
    1). Takes in inquirer answers obj as a parameter
    1). Set the message variable according to svgBgColorInvalid global value
    3). Call the promptColor function to recursively prompt a color
*/
const promptSVGBgColor = function( previousAnswers ) {
  const message =
    svgBgColorInvalid
    ? "Invalid color. Enter a background color ( All letters or hexadecimal value ):"
    : "Enter a background color ( All letters or hexadecimal value ):";
  return promptColor( previousAnswers, message, svgBgColorInvalid, promptSVGBgColor, "svgBgColor" );
}

/*
  Export the functions
*/
module.exports = {
  promptSVGText,
  promptSVGTextColor,
  promptSVGShape,
  promptSVGBgColor
}