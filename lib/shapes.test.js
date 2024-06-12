
/*
  Require Own Modules
*/
const { Triangle, Circle, Square } = require( "./shapes" );

/*
  Testing the Triangle Methods
*/
describe( "Triangle", () => {
  describe( "setColor", () => {
    it( "should set the svg fill color", () => {
      const triangle = new Triangle();
      triangle.setColor( "blue" );
      expect( triangle.render() ).toEqual( `<polygon points="10,200 150,10 290,200" fill="blue" />` );
    } );
  } );
  describe( "setText", () => {
    it( "should set the this.text property on triangle", () => {
      const triangle = new Triangle();
      triangle.setText( "DND" )
      expect( triangle.text ).toEqual( "DND" );
    } );
  } );
  describe( "setTextColor", () => {
    it( "should set the this.textColor property on triangle", () => {
      const triangle = new Triangle();
      triangle.setTextColor( "red" );
      expect( triangle.textColor ).toEqual( `red` );
    } );
  } );
} );

/*
  Testing the Circle Methods
*/
describe( "Circle", () => {
  describe( "setColor", () => {
    it( "should set the svg fill color", () => {
      const circle = new Circle();
      circle.setColor( "blue" );
      expect( circle.render() ).toEqual( `<circle cx="150" cy="100" r="100" fill="blue" />` );
    } );
  } );
  describe( "setText", () => {
    it( "should set the this.text property on circle", () => {
      const circle = new Circle();
      circle.setText( "DND" )
      expect( circle.text ).toEqual( "DND" );
    } );
  } );
  describe( "setTextColor", () => {
    it( "should set the this.textColor property on circle", () => {
      const circle = new Circle();
      circle.setTextColor( "red" );
      expect( circle.textColor ).toEqual( `red` );
    } );
  } );
} );

/*
  Testing the Square Methods
*/
describe( "Square", () => {
  describe( "setColor", () => {
    it( "should set the svg fill color", () => {
      const square = new Square();
      square.setColor( "blue" );
      expect( square.render() ).toEqual( `<rect x="50" y="0" width="200" height="200" fill="blue" />` );
    } );
  } );
  describe( "setText", () => {
    it( "should set the this.text property on square", () => {
      const square = new Square();
      square.setText( "DND" )
      expect( square.text ).toEqual( "DND" );
    } );
  } );
  describe( "setTextColor", () => {
    it( "should set the this.textColor property on square", () => {
      const square = new Square();
      square.setTextColor( "red" );
      expect( square.textColor ).toEqual( `red` );
    } );
  } );
} );