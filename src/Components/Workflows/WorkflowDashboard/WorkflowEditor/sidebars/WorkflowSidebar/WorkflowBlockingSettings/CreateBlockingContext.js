import React, {Component} from "react";
import uuid from "uuid";
import {Button, Col, Form, Overlay, Popover} from "react-bootstrap";

import RandomColorPicker from "./RandomColorPicker";
import "./CreateBlockingContext.css";

export default class CreateBlockingContext extends Component {

  togglePopoverButton = React.createRef();

  state = {
    show: false
  };

  onShowPopover = () => this.setState({show: true});


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
          placement="left"
          target={this.togglePopoverButton.current}
          container={document.getElementById('workflow-editor')}>

          <Popover title="Create blocking context"
                   id="create-blocking-context-popover" placement="left">
            <CreateBlockingContextPopover onCreated={this.onCreated}/>
          </Popover>
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
    );
  }
}
