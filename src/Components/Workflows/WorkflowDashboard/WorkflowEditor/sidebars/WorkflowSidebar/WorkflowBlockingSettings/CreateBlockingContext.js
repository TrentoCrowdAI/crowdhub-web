import React, {Component} from "react";
import uuid from "uuid";
import {Button, Col, Form, Overlay, Popover} from "react-bootstrap";

import RandomColorPicker from "./RandomColorPicker";
import "./CreateBlockingContext.css";

export default class CreateBlockingContext extends Component {

  togglePopoverButton = React.createRef();
  popoverContent = React.createRef();

  state = {
    show: false
  };

  showPopover = () => {
    this.setState({show: true});
    this.registerListenerToClosePopoverWhenUserClicksOutside();
  };

  registerListenerToClosePopoverWhenUserClicksOutside() {
    document.body.addEventListener('click', this.clickListenerToClosePopoverWhenUserClicksOutside);
  }

  clickListenerToClosePopoverWhenUserClicksOutside = (e) => {
    const popoverContent = this.popoverContent.current;
    const clickInPopover = e.path.indexOf(popoverContent) >= 0;
    if (!clickInPopover) {
      this.hidePopover();
    }
  };

  onCreated = (context) => {
    this.hidePopover();
    this.props.onAdd(context);
  };

  hidePopover = () => {
    this.setState({show: false});
    this.unregisterListenerToClosePopoverWhenUserClicksOutside();
  };

  unregisterListenerToClosePopoverWhenUserClicksOutside() {
    document.body.removeEventListener('click', this.clickListenerToClosePopoverWhenUserClicksOutside);
  }

  render() {
    return (
      <div>
        <Button className="btn-block"
                onClick={this.showPopover}
                ref={this.togglePopoverButton}>Add blocking context</Button>
        <Overlay
          id="create-blocking-context-popover-container"
          show={this.state.show}
          placement="left"
          target={this.togglePopoverButton.current}
          container={document.getElementById('workflow-editor')}>

          <Popover title="Create blocking context"
                   id="create-blocking-context-popover"
                   placement="left">
            <div ref={this.popoverContent}>
              <CreateBlockingContextPopover onCreated={this.onCreated}/>
            </div>
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
