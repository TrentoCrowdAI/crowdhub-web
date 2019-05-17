import React, {Component} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";


export default class RandomColorPicker extends Component {

  constructor(props) {
    super(props);
    let color = props.color;
    if (!color) {
      color = this.getNextRandomColor();
      this.props.onChange(color);
    }
    this.state = {
      color,
      userText: color
    };
  }

  pickRandomColor = () => this.setState(
    {color: this.getNextRandomColor()},
    state => {
      this.props.onChange(state.color)
    }
  );

  getNextRandomColor = () => RandomColorPicker.rgbToHex({
    r: RandomColorPicker.getRandomColorValue(),
    g: RandomColorPicker.getRandomColorValue(),
    b: RandomColorPicker.getRandomColorValue()
  });

  static  getRandomColorValue = () => Math.floor(Math.random() * Math.floor(256));

  static rgbToHex = ({r, g, b}) => `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

  onInputChange = (e) => this.setState({userText: e.target.value});

  onUserInsertHex = (e) => {
    const hex = e.target.value;
    if (RandomColorPicker.isHexValid(hex)) {
      this.setState({color: hex});
      this.props.onChange(hex);
    } else {
      this.setState({userText: this.state.color});
    }
  };

  static isHexValid = (hex) => !!RandomColorPicker.hexToRgb(hex);

  static hexToRgb = (hex) => {
    /* https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  render() {
    const {color, userText} = this.state;
    return (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="outline-secondary"
                  onClick={this.pickRandomColor}
                  style={{
                    backgroundColor: color,
                    color: RandomColorPicker.getTextColor(color)
                  }}>
            <i className="fas fa-sync-alt"/>
          </Button>
        </InputGroup.Prepend>
        <FormControl aria-describedby="basic-addon1" value={userText}
                     onBlur={this.onUserInsertHex}
                     onChange={this.onInputChange}/>
      </InputGroup>
    );
  }

  static getTextColor = (hex) => RandomColorPicker.getTextColorByBackgroundLuminance(
    RandomColorPicker.getLuminance(
      RandomColorPicker.hexToRgb(hex)
    )
  );

  static getLuminance = ({r, g, b}) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  static getTextColorByBackgroundLuminance = (luminance) => luminance > 0.5 ? 'black' : 'white';
}
