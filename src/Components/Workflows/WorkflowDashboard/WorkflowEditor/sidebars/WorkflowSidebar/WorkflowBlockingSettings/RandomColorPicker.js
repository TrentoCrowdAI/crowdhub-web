import React, {Component} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {getRandomColor, getTextColorVisibleOnBackground, isHexValid} from "../../../../../../utils/colors";


export default class RandomColorPicker extends Component {

  constructor(props) {
    super(props);
    let color = props.color;
    if (!color) {
      color = getRandomColor();
      this.props.onChange(color);
    }
    this.state = {
      color,
      userText: color
    };
  }

  pickRandomColor = () => {
    const color = getRandomColor();
    this.setState({
        color,
        userText: color
      }, () => this.props.onChange(this.state.color)
    );
  };


  onInputChange = (e) => {
    const color = e.target.value;
    this.setState({userText: color});
    if (isHexValid(color)) {
      this.setState({color});
      this.props.onChange(color);
    }
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
                    borderColor: color,
                    color: getTextColorVisibleOnBackground(color)
                  }}>
            <i className="fas fa-sync-alt"/>
          </Button>
        </InputGroup.Prepend>
        <FormControl aria-describedby="basic-addon1" value={userText}
                     onChange={this.onInputChange}/>
      </InputGroup>
    );
  }


}
