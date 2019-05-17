import React, {Component} from "react";
import uuid from "uuid";
import {Button, Col, Form, Overlay, Popover} from "react-bootstrap";

import RandomColorPicker from "./RandomColorPicker";

export default class CreateBlockingContext extends Component {

  togglePopoverButton = React.createRef();

  state = {
    show: false
  };

  onShowPopover = ({target}) => {
    this.setState({show: true, target});
    this.fixPopoverPosition();
  };

  /**
   * This fix should be necessary. According to the react-bootstrap documentation, we can attach the popover to the div
   * that contains the button to show the popover and the position should be automatically set.
   * But, even after specifying the target and the container of the Overlay, the popover continues to appear on the top
   * left corner of the screen.
   * @returns {never}
   */
  fixPopoverPosition = () => setImmediate(() => {
    const overlay = document.getElementById('create-blocking-context-popover');
    const button = this.togglePopoverButton.current;
    const buttonRect = button.getBoundingClientRect();
    overlay.style.top = `${buttonRect.top}px`;
    overlay.style.left = `${buttonRect.left - buttonRect.width}px`;
  });

  onCreated = (context) => {
    this.setState({show: false});
    this.props.onAdd(context);
  };

  render() {
    return (
      <div>
        <Button className="btn-block"
                onClick={this.onShowPopover}
                ref={this.togglePopoverButton}>Add blocking context</Button>
        <Overlay
          id="create-blocking-context-popover-container"
          show={this.state.show}
          placement="left-end">

          <CreateBlockingContextPopover onCreated={this.onCreated}/>
        </Overlay>
      </div>
    );
  }


}


class CreateBlockingContextPopover extends Component {


  state = {
    name: '',
    color: null
  };

  onNameChange = (e) => this.setState({name: e.target.value});

  onChangeColor = (color) => this.setState({color});

  isValid = () => this.state.name.length > 0;

  onAdd = () => {
    this.props.onCreated({
      id: uuid(),
      name: this.state.name,
      color: this.state.color
    });
    this.setState({name: '', color: null});
  };


  render() {
    const {name, color} = this.state;
    return (
      <Popover title="Create blocking context"
               id="create-blocking-context-popover" placement="left">
        <Form.Row>
          <Col xs="12">
            <Form.Group>
              <Form.Control name="name"
                            type="text"
                            placeholder="Blocking context name"
                            value={name}
                            onChange={this.onNameChange}/>
            </Form.Group>

          </Col>
          <Col xs="8">
            <RandomColorPicker color={color} onChange={this.onChangeColor}/>
          </Col>
          <Col xs="4">
            <Button className="btn-block"
                    disabled={!this.isValid()}
                    onClick={this.onAdd}>Add</Button>
          </Col>
        </Form.Row>
      </Popover>
    );
  }
}
