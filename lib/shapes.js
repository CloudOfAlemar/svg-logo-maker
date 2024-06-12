
/*
  Created the Shape Class
*/
class Shape {
  constructor() {
    this.x = 150;
    this.svg = 
      `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      {%SHAPE%}
      <text x="{%X%}" y="{%Y%}" font-size="60" text-anchor="middle" dominant-baseline="middle" fill="{%TEXT_COLOR%}">{%TEXT%}</text>
      </svg>`;
  }
  setText( text ) {
    this.text = text;
    return this;
  }
  setTextColor( textColor ) {
    this.textColor = textColor;
    return this;
  }
  setColor( color ) {
    this.color = color;
    return this;
  }
  renderSVG() {
    return this.svg
      .replace( "{%SHAPE%}", this.render() )
      .replace( "{%X%}", this.x )
      .replace( "{%Y%}", this.y )
      .replace( "{%TEXT_COLOR%}", this.textColor || "white" )
      .replace( "{%TEXT%}", this.text || "SVG" );
  }
}

/*
  Create the Triangle Class - inherit from Shape class
*/
class Triangle extends Shape {
  constructor() {
    super();
    this.y = 140;
  }
  render() {
    if( !this.color ) {
      throw new Error( "Call the .setColor method first to give the svg a color." );
    } else {
      return `<polygon points="10,200 150,10 290,200" fill="${ this.color }" />`;
    }
  }
}

/*
  Create the Circle Class - inherit from Shape class
*/
class Circle extends Shape {
  constructor() {
    super();
    this.y = 110;
  }
  render() {
    return `<circle cx="150" cy="100" r="100" fill="${ this.color ? this.color : "black" }" />`;
  }
}

/*
  Create the Square Class - inherit from Shape class
*/
class Square extends Shape {
  constructor() {
    super();
    this.y = 110;
  }
  render() {
    return `<rect x="50" y="0" width="200" height="200" fill="${ this.color ? this.color : "black" }" />`;
  }
}

/*
  Export Classes
*/
module.exports = {
  Circle,
  Triangle,
  Square
}